<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import { ACTIONS } from '../variables'
import { v4 } from 'uuid'
import { useRouter } from 'vue-router'
import getSocket from '../socket'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'
import { can } from '@/modules/role/utils'

const router = useRouter()

const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)

const socket = getSocket()

const canFn = can()

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
  <div class="q-mb-xl">
    <h1 class="text-h4 q-mt-none">{{ dictionary.Video_chat }}</h1>
    <q-btn
      v-if="canFn(['video-chat:create_room'])"
      unelevated
      color="primary"
      @click="createRoom"
    >
      {{ dictionary.Create_room }}
    </q-btn>
  </div>

  <div v-if="canFn(['video-chat:get_room'])" class="row">
    <div v-for="room in rooms" :key="room.id" class="col-4">
      <q-card class="q-ma-xs">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ room }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-if="canFn(['video-chat:create_room'])"
            unelevated
            color="primary"
            @click="join(room)"
          >
            {{ dictionary.Join_room }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
