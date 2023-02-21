<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { requiredRule, emailRule, minLengthRule } from '@/rules'
import authService from '../services'
import notify from '@/plugins/notify'

const $q = useQuasar()
const email = ref('')
const password = ref('')

const notification = notify($q)

const onSubmit = async () => {
  try {
    const data = await authService.getAccessToken({
      email: email.value,
      password: password.value,
    })

    notification.success({ message: 'Login success' })
  } catch (error) {
    notification.error({ message: 'Login error' })
  }
}
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <h1 class="text-h4 q-mt-none q-mb-xl">Login</h1>
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-input
          v-model="email"
          label="E-mail"
          lazy-rules
          outlined
          :rules="[requiredRule, emailRule]"
        />
        <q-input
          v-model="password"
          label="Password"
          lazy-rules
          outlined
          type="password"
          :rules="[requiredRule, minLengthRule(6)]"
        />
        <div>
          <q-btn unelevated type="submit" color="primary">Login</q-btn>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
