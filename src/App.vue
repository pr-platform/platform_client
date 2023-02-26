<script setup lang="ts">
import { ref, watch  } from 'vue'
import { useUserStore } from '@/modules/user/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const { profile } = storeToRefs(userStore)

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
  localStorage.removeItem('access_token')
  router.push({ name: 'Home' })
  userStore.profile = null
}

watch(profile, (profile) => {
  if (profile) {
    leftDrawerOpen.value = true
  } else {
    leftDrawerOpen.value = false
  }
})
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="profile" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Platform
        </q-toolbar-title>

        <q-btn
          v-if="!profile"
          flat
          @click="router.push({ name: 'SignIn' })"
        >
          Sign in
        </q-btn>

        <div v-else class="flex">
          <q-btn
            flat
            @click="router.push({ name: 'Profile' })"
          >
            Profile
          </q-btn>

          <q-separator dark vertical />

          <q-btn
            flat
            icon="logout"
            @click="logout"
          />
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list bordered separator>
        <q-item clickable v-ripple :to="{ name: 'SendMail' }">
          <q-item-section>Mail</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>

    <q-footer class="text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Platform</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
