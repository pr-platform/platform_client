<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import socket from '../socket'
import { ACTIONS } from '../variables'

const router = useRouter()
const route = useRoute()

const roomId = route.params.id

const peerConnections = ref({})
const localMediaStream = ref(null)
const peerMediaElements = ref({})

const startCapture = async () => {

}

onMounted(async () => {
  try {
    await startCapture()
    socket.emit(ACTIONS.JOIN, {
      roomId,
    })
  } catch (error) {
    console.error(error.message)
  }
})

</script>

<template>
  <h1 class="text-h4 q-mt-none">Room</h1>
</template>
