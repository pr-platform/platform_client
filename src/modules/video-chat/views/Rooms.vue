<script setup lang="ts">
import { io } from 'socket.io-client'
import { ref, onMounted, reactive } from 'vue'
import { ACTIONS } from '../variables'
import { v4 } from 'uuid'
import { useRouter } from 'vue-router'

const router = useRouter()

const options = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
}

let socket = null

const rooms = ref([])

const updateRooms = (newrooms) => {
  rooms.value = newrooms
}

const join = (roomId) => {
  router.push({ name: 'Room', params: {
    id: roomId,
  }})
}

const createRoom = () => {
  router.push({ name: 'Room', params: {
    id: v4(),
  }})
}

const test = () => {
  socket.emit('test-on', { roomId: v4() }, res => {
    console.log(res)
  })
}

onMounted(async () => {
  socket = io('http://localhost:3003')

  socket.on('connect', () => {
    console.log('Connected')

    socket.on(ACTIONS.SHARE_ROOMS, (data) => {
      console.log(data.rooms)
      updateRooms(data.rooms)
    })
  })

  socket.on('exception', (data) => {
    console.log('event', data)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
})
</script>

<template>
  <h1 class="text-h4 q-mt-none">Rooms</h1>
  <div>
    <div v-for="room in rooms" :key="room.id">
      <div>
        <h3 class="text-h6 q-mt-none">{{ room }}</h3>
        <button @click="join(rrom.id)">Join</button>
      </div>
    </div>
  </div>

  <button @click="createRoom">Create</button>
  <button @click="test">Test</button>
</template>
