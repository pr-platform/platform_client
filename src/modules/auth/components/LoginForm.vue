<script setup lang="ts">
import { useQuasar } from 'quasar'
import { reactive, ref } from 'vue'
import { requiredRule, emailRule, minLengthRule } from '@/rules'
import authService from '../services'
import notify from '@/plugins/notify'
import userService from '@/modules/user/services'
import { useUserStore } from '../../user/store'
import { useRouter } from 'vue-router'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const langStore = useLangStore()
const router = useRouter()

const { dictionary } = storeToRefs(langStore)

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
      <h1 class="text-h4 q-mt-none q-mb-xl">{{ dictionary.Sign_in }}</h1>
      <q-form
        class="q-gutter-sm"
        @submit="onSubmit"
      >
        <q-input
          v-model="authData.email"
          :label="dictionary.Email"
          lazy-rules
          outlined
          dense
          :rules="[requiredRule, emailRule]"
        />
        <q-input
          v-model="authData.password"
          :label="dictionary.Password"
          lazy-rules
          outlined
          dense
          type="password"
          :rules="[requiredRule, minLengthRule(6)]"
        />
        <div class="flex items-center justify-between q-mb-sm">
          <q-btn unelevated type="submit" color="primary">{{ dictionary.Sign_in }}</q-btn>
          <a
            class="text-primary cursor-pointer"
            @click.prevent="router.push({ name: 'SignUp' })"
          >
            {{ dictionary.Sign_up }}
          </a>
        </div>

        <a
          class="text-primary cursor-pointer"
          @click.prevent="router.push({ name: 'ResetPassword' })"
        >
          {{ dictionary.Forgot_your_password }}
        </a>
      </q-form>
    </q-card-section>
  </q-card>
</template>
