<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { requiredRule, emailRule, minLengthRule } from '@/rules'
import authService from '../services'
import notify from '@/plugins/notify'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const reset_token = route.query.reset_token as string

const $q = useQuasar()

const isRequestSend = ref(!!reset_token)

const email = ref('')
const password = ref('')

const notification = notify($q)

const sendRequest = async () => {
  try {
    await authService.requestOnResetPassword({
      email: email.value,
    })

    isRequestSend.value = true

    notification.success({ message: 'Request success' })
  } catch (error) {
    notification.error({ message: error.message })
  }
}

const resetPassword = async () => {
  try {
    await authService.resetPassword({
      reset_token,
      password: password.value,
    })

    router.push({ name: 'SignIn' })

    isRequestSend.value = true

    notification.success({ message: 'Reset success' })
  } catch (error) {
    notification.error({ message: error.message })
  }
}
</script>

<template>
  <div class="row flex-center q-pt-xl">
    <div class="col col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      <q-card bordered flat>
        <q-card-section>
          <h1 class="text-h4 q-mt-none q-mb-xl">Reset password</h1>
          <q-form
            v-if="!isRequestSend"
            class="q-gutter-sm"
            @submit="sendRequest"
          >
            <q-input
              v-model="email"
              label="E-mail"
              lazy-rules
              outlined
              dense
              :rules="[requiredRule, emailRule]"
            />
            <q-btn unelevated type="submit" color="primary">Send</q-btn>
          </q-form>

          <h2 v-else-if="isRequestSend && !reset_token" class="text-h6">A password reset confirmation email has been sent to your email</h2>

          <q-form
            v-else
            class="q-gutter-sm"
            @submit="resetPassword"
          >
            <q-input
              v-model="password"
              label="Password"
              lazy-rules
              outlined
              dense
              type="password"
              :rules="[requiredRule, minLengthRule(6)]"
            />
            <q-btn unelevated type="submit" color="primary">Reset</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
