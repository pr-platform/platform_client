<script setup lang="ts">
import { io, ManagerOptions } from 'socket.io-client'
import { ref, onMounted, reactive } from 'vue'
import { ACTIONS } from '../variables'
import { v4 } from 'uuid'
import { useRouter } from 'vue-router'
import socket from '../socket'

const router = useRouter()

const options: Partial<ManagerOptions> = {
  forceNew: true,
  timeout: 10000,
  transports: ['websocket'],
}

const rooms = ref([])

const updateRooms = (allRooms) => {
  rooms.value = allRooms
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

onMounted(async () => {
  socket.on('connect', () => {
    // console.log('Connected')

    socket.on(ACTIONS.SHARE_ROOMS, (data) => {
      // console.log(data.rooms)
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
        <button @click="join(room)">Join</button>
      </div>
    </div>
  </div>

  <button @click="createRoom">Create room</button>
</template>
