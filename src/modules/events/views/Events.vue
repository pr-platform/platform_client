<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import eventsService from '../services'
import { useUserStore } from '../store'
import { io } from "socket.io-client"

onMounted(async () => {
  const socket = io('http://localhost:3003');
  socket.on('connect', () => {
    console.log('Connected');

    socket.emit('events', { test: 'test' });
    socket.emit('identity', 0, response =>
      console.log('Identity:', response),
    );
  });
  socket.on('events', (data) => {
    console.log('event', data);
  });
  socket.on('exception', (data) => {
    console.log('event', data);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
})
</script>

<template>
  <h1 class="text-h4 q-mt-none">Events</h1>
</template>
