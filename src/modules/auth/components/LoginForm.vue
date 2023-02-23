<script setup lang="ts">
import { useQuasar } from 'quasar'
import { reactive, ref } from 'vue'
import { requiredRule, emailRule, minLengthRule } from '@/rules'
import authService from '../services'
import notify from '@/plugins/notify'
import userService from '@/modules/user/services'
import { useUserStore } from '../../user/store'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const $q = useQuasar()

const authData = reactive({
  email: '',
  password: '',
})

const notification = notify($q)

const onSubmit = async () => {
  const { email, password } = authData

  try {
    const accessTokenResponse = await authService.getAccessToken({ email, password })

    localStorage.setItem('access_token', accessTokenResponse.access_token)

    userStore.profile = await userService.getProfile()

    router.push({ name: 'Profile' })

    notification.success({ message: 'Login success' })
  } catch (error) {
    console.error(error)
    notification.error({ message: error.message })
  }
}
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <h1 class="text-h4 q-mt-none q-mb-xl">Sign in</h1>
      <q-form
        class="q-gutter-sm"
        @submit="onSubmit"
      >
        <q-input
          v-model="authData.email"
          label="E-mail"
          lazy-rules
          outlined
          dense
          :rules="[requiredRule, emailRule]"
        />
        <q-input
          v-model="authData.password"
          label="Password"
          lazy-rules
          outlined
          dense
          type="password"
          :rules="[requiredRule, minLengthRule(6)]"
        />
        <div class="flex items-center justify-between q-mb-sm">
          <q-btn unelevated type="submit" color="primary">Sign in</q-btn>
          <a
            class="text-primary cursor-pointer"
            @click.prevent="router.push({ name: 'SignUp' })"
          >
            Sign up
          </a>
        </div>

        <a
          class="text-primary cursor-pointer"
          @click.prevent="router.push({ name: 'ResetPassword' })"
        >
          Forgot your password?
        </a>
      </q-form>
    </q-card-section>
  </q-card>
</template>
