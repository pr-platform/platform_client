<script setup lang="ts">
import { reactive, defineEmits } from 'vue'
import { requiredRule } from '@/rules'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'
import langService from '@/modules/lang/services'
import { CreateLangArgs } from '../types'

const $q = useQuasar()
const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)
const notification = notify($q)
const emit = defineEmits(['lang-created'])

const createLangArgs = reactive<CreateLangArgs>({
  alias: '',
  lexeme: '',
})

const createLang = async () => {
  try {
    const { alias, lexeme } = createLangArgs
    const createdLang = await langService.createLang({ alias, lexeme })

    notification.success({ message: 'Lang created' })
    emit('lang-created', createdLang)
  } catch (error) {
    notification.error({ message: error.message })
  }
}
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <q-form class="q-gutter-lg" @submit="createLang">
        <h3 class="text-h4">{{ dictionary.Create_lang}}</h3>
        <q-input
          v-model="createLangArgs.alias"
          :label="dictionary.Alias"
          lazy-rules
          outlined
          dense
          hide-bottom-space
          :rules="[requiredRule]"
        />
        <q-input
          v-model="createLangArgs.lexeme"
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
