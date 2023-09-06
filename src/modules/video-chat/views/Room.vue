<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import freeice from 'freeice'
import { ACTIONS } from '../variables'
import getSocket from '../socket'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'

const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)

const socket = getSocket()

const LOCAL_VIDEO = 'LOCAL_VIDEO'

const route = useRoute()

const roomId = route.params.id

const peerConnections = {}
let localMediaStream = null
const peerMediaElements = ref({
  [LOCAL_VIDEO]: null,
});

const clients = ref([])

const addNewClient = async (newClient) => {
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

  await addNewClient({
    peerId: LOCAL_VIDEO,
  })

  const elem = peerMediaElements.value[LOCAL_VIDEO]

  if (elem) {
    elem.volume = 0
    elem.srcObject = localMediaStream
  }
}

const provideMediaRef = (elem, client) => {
  peerMediaElements.value[client.peerId] = elem;
}

const handleNewPeer = async ({ peerId, createOffer, user }) => {
  if (peerId in peerConnections) {
    return console.warn(`Already conected to peer ${peerId}`)
  }

  peerConnections[peerId] = new RTCPeerConnection({
    iceServers: freeice(),
  })

  peerConnections[peerId].onicecandidate = event => {
    if (event.candidate) {
      socket.emit(ACTIONS.RELAY_ICE, {
        peerId,
        iceCandidate: event.candidate,
      })
    }
  }

  let trackNumbers = 0
  peerConnections[peerId].ontrack = async ({ streams: [remoteStream] }) => {
    trackNumbers++

    if (trackNumbers === 2) {
      await addNewClient({
        peerId,
        user,
      })

      const elem = peerMediaElements.value[peerId]

      if (elem) {
        elem.volume = 1
        elem.srcObject = remoteStream;
      }
    }
  }

  localMediaStream.getTracks().forEach(track => {
    peerConnections[peerId].addTrack(track, localMediaStream)
  })

  if (createOffer) {
    const offer = await peerConnections[peerId].createOffer()

    await peerConnections[peerId].setLocalDescription(offer)

    socket.emit(ACTIONS.RELAY_SDP, {
      peerId,
      sessionDescription: offer,
    })
  }
}

const setRemoteMedia = async ({ peerId, sessionDescription }) => {
  await peerConnections[peerId].setRemoteDescription(new RTCSessionDescription(sessionDescription))

  if (sessionDescription.type === 'offer') {
    const answer = await peerConnections[peerId].createAnswer()

    await peerConnections[peerId].setLocalDescription(answer)

    socket.emit(ACTIONS.RELAY_SDP, {
      peerId,
      sessionDescription: answer,
    })
  }
}

const getUserFromPeer = (client) => {
  if (client.peerId === LOCAL_VIDEO) return 'I am'

  return `${client.user?.lastname ?? ''} ${client.user?.firstname ?? ''}`.trim() || 'No name'
}

onMounted(async () => {
  try {
    await startCapture()
    socket.emit(ACTIONS.JOIN, { roomId })

    socket.on(ACTIONS.ADD_PEER, handleNewPeer)

    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)

    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerId, iceCandidate}) => {
      peerConnections[peerId].addIceCandidate(new RTCIceCandidate(iceCandidate))
    })

    socket.on(ACTIONS.REMOVE_PEER, ({ peerId }) => {
      if (peerConnections[peerId]) {
        peerConnections[peerId].close()
      }

      delete peerConnections[peerId]

      clients.value = clients.value.filter(c => c.peerId !== peerId)
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
  <h1 class="text-h4 q-mt-none">{{ dictionary.Video_chat }}</h1>

  <div class="row">
    <div v-for="client in clients" :key="client" class="col-4">
      <q-card class="q-ma-xs">
        <q-card-section
          class="text-white"
          :class="{
            'bg-red': client.user?.isCreator && client.peerId !== 'LOCAL_VIDEO',
            'bg-primary': !client.user?.isCreator,
            'bg-teal': client.peerId === 'LOCAL_VIDEO',
          }"
        >
          <div class="text-h6">{{ getUserFromPeer(client) }}</div>
        </q-card-section>

        <video
          :ref="(node) => provideMediaRef(node, client)"
          autoplay
          style="width: 100%"
          :muted="client === 'LOCAL_VIDEO'"
        />
      </q-card>
    </div>
  </div>
</template>
