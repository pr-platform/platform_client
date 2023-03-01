<script setup lang="ts">
import { useQuasar } from 'quasar'
import { reactive } from 'vue'
import { requiredRule, emailRule, minLengthRule } from '@/rules'
import authService from '../services'
import notify from '@/plugins/notify'
import { useRouter } from 'vue-router'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'

const router = useRouter()

const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)

const $q = useQuasar()

const registrationArgs = reactive({
  email: '',
  password: '',
})

const notification = notify($q)

const onSubmit = async () => {
  const { email, password } = registrationArgs

  try {
    await authService.registration({ email, password })

    router.push({ name: 'RegistrationInfo' })

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
      <h1 class="text-h4 q-mt-none q-mb-xl">{{ dictionary.Sign_up }}</h1>
      <q-form
        class="q-gutter-sm"
        @submit="onSubmit"
      >
        <q-input
          v-model="registrationArgs.email"
          :label="dictionary.Email"
          lazy-rules
          outlined
          dense
          :rules="[requiredRule, emailRule]"
        />
        <q-input
          v-model="registrationArgs.password"
          :label="dictionary.Password"
          lazy-rules
          outlined
          dense
          type="password"
          :rules="[requiredRule, minLengthRule(6)]"
        />
        <div class="flex items-center justify-between">
          <q-btn unelevated type="submit" color="primary">{{ dictionary.Sign_up }}</q-btn>
          <a
            class="text-primary cursor-pointer"
            @click.prevent="router.push({ name: 'SignIn' })"
          >
            {{ dictionary.Sign_in }}
          </a>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
