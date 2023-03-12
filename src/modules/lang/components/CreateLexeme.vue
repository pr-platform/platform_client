<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { requiredRule } from '@/rules'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'
import langService from '../services'

const $q = useQuasar()
const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)
const notification = notify($q)
const emit = defineEmits(['lexeme-created'])

const lexeme = ref('')

const createLexeme = async () => {
  try {
    const createdLexeme = await langService.createLexeme({ lexeme: lexeme.value })

    notification.success({ message: 'Lexeme created' })
    emit('lexeme-created', createdLexeme)
  } catch (error) {
    notification.error({ message: error.message })
  }
}
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <q-form class="q-gutter-lg" @submit="createLexeme">
        <h3 class="text-h4">{{ dictionary.Create_lexeme }}</h3>

        <q-input
          v-model="lexeme"
          :label="dictionary.Lexeme"
          lazy-rules
          outlined
          dense
          hide-bottom-space
          :rules="[requiredRule]"
        />
        <q-btn unelevated type="submit" color="primary">{{ dictionary.Create }}</q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>
