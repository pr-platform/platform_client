<script setup lang="ts">
import { io, ManagerOptions } from 'socket.io-client'
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import { ACTIONS } from '../variables'
import { v4 } from 'uuid'
import { useRouter } from 'vue-router'
import getSocket from '../socket'

const router = useRouter()

const socket = getSocket()

const options: Partial<ManagerOptions> = {
  forceNew: true,
  timeout: 10000,
  transports: ['websocket'],
}

const rooms = ref([])

const updateRooms = (data) => {
  rooms.value = data.rooms
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

const exeptionSocket = (data) => {
  console.log(data)
}

const connect = () => {}

onMounted(async () => {
  socket.emit(ACTIONS.SHARE_ROOMS, updateRooms)

  socket.on(ACTIONS.SHARE_ROOMS, updateRooms)

  socket.on('exception', exeptionSocket)

  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
})

onBeforeUnmount(() => {
  socket.off(ACTIONS.SHARE_ROOMS, updateRooms)
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
