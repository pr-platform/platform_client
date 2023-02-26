<script setup lang="ts">
import { reactive } from 'vue'
import { requiredRule, emailRule, minLengthRule } from '@/rules'
import { SendEmailArgs } from '../types'
import mailService from '../services'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const notification = notify($q)

const sendEmailArgs = reactive<SendEmailArgs>({
  to: '',
  subject: '',
  text: '',
  html: '',
})

const send = async () => {
  try {
    const { to, subject, text, html } = sendEmailArgs

    await mailService.sendEmail({ to, subject, text, html })

    notification.success({ message: 'Email send' })
  } catch (error) {
    notification.error({ message: error.message })
  }
}
</script>

<template>
  <div class="row">
    <div class="col col-12 col-xl-8">
      <q-card bordered flat>
        <q-card-section>
          <q-form class="q-gutter-lg" @submit="send">
            <h3 class="text-h6">Send mail</h3>
            <q-input
              v-model="sendEmailArgs.to"
              label="E-mail"
              lazy-rules
              outlined
              dense
              hide-bottom-space
              :rules="[requiredRule, emailRule]"
            />
            <q-input
              v-model="sendEmailArgs.subject"
              label="Subject"
              outlined
              dense
            />
            <q-input
              v-model="sendEmailArgs.text"
              label="Text"
              outlined
              dense
              type="textarea"
            />
            <q-editor
              v-model="sendEmailArgs.html"
              min-height="8rem"
            />

            <q-btn unelevated type="submit" color="primary">Send</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>