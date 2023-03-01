<script setup lang="ts">
import { ref, watch, onMounted  } from 'vue'
import { useUserStore } from '@/modules/user/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import langService from '@/modules/lang/services'
import { useLangStore } from '@/modules/lang/store'

const userStore = useUserStore()
const langStore = useLangStore()
const router = useRouter()

const { profile } = storeToRefs(userStore)

const leftDrawerOpen = ref(false)

const langs = ref([])

const { dictionary } = storeToRefs(langStore)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
  localStorage.removeItem('access_token')
  router.push({ name: 'Home' })
  userStore.profile = null
}

const currentLang = ref('en')

const setLang = async (lang) => {
  localStorage.setItem('lang', lang)
  currentLang.value = lang

  langStore.dictionary = await getDictonary();
}

watch(profile, (profile) => {
  if (profile) {
    leftDrawerOpen.value = true
  } else {
    leftDrawerOpen.value = false
  }
})

const getDictonary = async () => {
  try {
    return await langService.getDictionary({
      where: {
        alias: currentLang.value,
      },
      include_dictionary: true,
    });
  } catch (error) {
    console.error(error.message)
  }
}

onMounted(async () => {
  langs.value = await langService.getLangs()
  await setLang(localStorage.getItem('lang') || 'en')
})
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="profile" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ dictionary.Platform_name }}
        </q-toolbar-title>

        <q-btn-dropdown stretch flat :label="currentLang">
          <q-list>
            <q-item
              v-for="lang in langs"
              :key="lang.alias"
              clickable
              v-close-popup
              @click="setLang(lang.alias)"
            >
              <q-item-section>
                <q-item-label caption>{{ lang.alias }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          v-if="!profile"
          flat
          @click="router.push({ name: 'SignIn' })"
        >
          {{ dictionary.Sign_in }}
        </q-btn>

        <div v-else class="flex">
          <q-btn
            flat
            @click="router.push({ name: 'Profile' })"
          >
            {{ dictionary.Profile }}
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
          <q-item-section>{{ dictionary.Mail }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'Langs' }">
          <q-item-section>{{ dictionary.Langs }}</q-item-section>
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
          <div>{{ dictionary.Platform_name }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
