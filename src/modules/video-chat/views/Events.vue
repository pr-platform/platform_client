<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import eventsService from '../services'
import { useUserStore } from '../store'
import { io } from "socket.io-client"

let socket = null

const send = () => {
  socket.emit('test-event', { message: 'From client' }, res => {
    console.log(res)
  })
}

onMounted(async () => {
  socket = io('http://localhost:3003')
  socket.on('connect', () => {
    console.log('Connected')

    socket.emit('test-event', { message: 'From client' }, res => {
      console.log(res)
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
  <h1 class="text-h4 q-mt-none">Events</h1>
  <div class="row">
    <div class="col col-12 col-xl-4">
      <q-card bordered flat>
        <q-card-section>
          <q-form class="q-gutter-lg" @submit="send">
            <q-btn unelevated type="submit" color="primary">Send</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
