<script setup lang="ts">
import { ref, onMounted } from 'vue'
import getSocket from '../socket'

const exeptionSocket = (data) => {
  console.log(data)
}

const socket = getSocket({
  onConnect: () => {
    isConnect.value = true
  }
})

const isConnect = ref(false)

onMounted(async () => {
  isConnect.value = socket.connected
  socket.on('exception', exeptionSocket)

  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
})
</script>

<template>
  <router-view v-if="isConnect" />
</template>
