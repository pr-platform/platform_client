<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { reactive, ref, watch  } from 'vue'
import { useUserStore } from '@/modules/user/store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { profile } = storeToRefs(userStore)

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(profile, (profile) => {
  if (profile) {
    leftDrawerOpen.value = true
  }
})
</script>

<template>
  <!-- <q-btn color="white" text-color="black" label="Standard" />
  <HelloWorld msg="Platform" />
  <router-link :to="{ name: 'Info' }">Info</router-link> -->

  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="profile" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Platform
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
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
