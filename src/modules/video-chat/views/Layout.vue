<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ACTIONS } from '../variables'
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
  socket.on('exception', exeptionSocket)

  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
})
</script>

<template>
  <router-view v-if="isConnect" />
</template>
