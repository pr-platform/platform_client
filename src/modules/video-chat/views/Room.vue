<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import freeice from 'freeice'
import geSsocket from '../socket'
import { ACTIONS } from '../variables'
import getSocket from '../socket'

const socket = getSocket()

const LOCAL_VIDEO = 'LOCAL_VIDEO'

const router = useRouter()
const route = useRoute()

const roomId = route.params.id

const peerConnections = {}
let localMediaStream = null
const peerMediaElements = ref({
  [LOCAL_VIDEO]: null,
});

const clients = ref([])

const addNewClient = async (newClient) => {
  console.log('addNewClient', newClient)
  if (!clients.value.includes(newClient)) {
    clients.value.push(newClient)
  }

  await nextTick()
}

const startCapture = async () => {
  localMediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: 1280,
      height: 720,
    },
  })

  await addNewClient(LOCAL_VIDEO)

  const elem = peerMediaElements.value[LOCAL_VIDEO]

  console.log(localMediaStream)

  if (elem) {
    elem.volume = 0
    elem.srcObject = localMediaStream
  }
}

const provideMediaRef = (elem, client) => {
  console.log('provideMediaRef', client)
  peerMediaElements.value[client] = elem;
}

const handleNewPeer = async ({ peerId, createOffer }) => {
  if (peerId in peerConnections) {
    return console.warn(`Already conected to peer ${peerId}`)
  }

  peerConnections[peerId] = new RTCPeerConnection({
    iceServers: freeice(),
  })


  peerConnections[peerId].onicecandidate = event => {
    console.log('onicecandidate')
    if (event.candidate) {
      socket.emit(ACTIONS.RELAY_ICE, {
        peerId,
        iceCandidate: event.candidate,
      })
    }
  }

  let trackNumbers = 0
  peerConnections[peerId].ontrack = async ({ streams: [remoteStream] }) => {
    console.log('ontrack', remoteStream)
    trackNumbers++

    if (trackNumbers === 2) {
      await addNewClient(peerId)

      const elem = peerMediaElements.value[peerId]

      if (elem) {
        elem.volume = 1
        elem.srcObject = remoteStream;
      }
    }
  }

  localMediaStream.getTracks().forEach(track => {
    console.log('addTrack', track)
    peerConnections[peerId].addTrack(track, localMediaStream)
  })

  if (createOffer) {
    console.log('createOffer')
    const offer = await peerConnections[peerId].createOffer()

    await peerConnections[peerId].setLocalDescription(offer)

    socket.emit(ACTIONS.RELAY_SDP, {
      peerId,
      sessionDescription: offer,
    })
  }
}

const setRemoteMedia = async ({ peerId, sessionDescription }) => {
  console.log('setRemoteMedia', peerId)
  await peerConnections[peerId].setRemoteDescription(new RTCSessionDescription(sessionDescription))

  if (sessionDescription.type === 'offer') {
    console.log('offer')
    const answer = await peerConnections[peerId].createAnswer()

    await peerConnections[peerId].setLocalDescription(answer)

    socket.emit(ACTIONS.RELAY_SDP, {
      peerId,
      sessionDescription: answer,
    })
  }
}

onMounted(async () => {
  try {
    await startCapture()
    socket.emit(ACTIONS.JOIN, { roomId })

    socket.on(ACTIONS.ADD_PEER, handleNewPeer)

    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)

    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerId, iceCandidate}) => {
      console.log(ACTIONS.ICE_CANDIDATE)
      peerConnections[peerId].addIceCandidate(new RTCIceCandidate(iceCandidate))
    })

    socket.on(ACTIONS.REMOVE_PEER, ({ peerId }) => {
      if (peerConnections[peerId]) {
        peerConnections[peerId].close()
      }

      delete peerConnections[peerId]

      clients.value = clients.value.filter(c => c !== peerId)
    })
  } catch (error) {
    console.error(error.message)
  }
})

onBeforeUnmount(() => {
  localMediaStream.getTracks().forEach(track => track.stop())
  socket.emit(ACTIONS.LEAVE, { roomId })
})
</script>

<template>
  <h1 class="text-h4 q-mt-none">Room</h1>

  {{ clients }}
  <div v-for="client in clients" :key="client" style="width: 100%">
    {{ client }}
    <video
      :ref="(node) => provideMediaRef(node, client)"
      autoplay
      style="width: 100%"
      controls
      :muted="client === 'LOCAL_VIDEO'"
    />
  </div>
</template>
