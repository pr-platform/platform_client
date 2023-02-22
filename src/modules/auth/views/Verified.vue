<script setup lang="ts">
import { useRoute } from 'vue-router'
import authService from '../services'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()

const route = useRoute()
const router = useRouter()

const notification = notify($q)

const verified = async () => {
  try {
    const verified_token = route.query.verified_token as string
    await authService.verified({ verified_token })

    router.push({ name: 'SignIn' })

    notification.success({ message: 'Verified success' })
  } catch (error) {
    notification.error({ message: error.message })
  }
}
</script>

<template>
  <div class="column flex-center">
    <h1 class="text-h4">Press button to verified you account</h1>
    <q-btn unelevated color="primary" @click="verified">Verified</q-btn>
  </div>
</template>
