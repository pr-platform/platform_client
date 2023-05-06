<script setup lang="ts">
import { reactive, defineEmits } from 'vue'
import { requiredRule } from '@/rules'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'
import roleService from '../services'
import { CreateRoleArgs } from '../types'
import { can } from '../utils'

const $q = useQuasar()
const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)
const notification = notify($q)
const emit = defineEmits(['role-created'])

const canFn = can()

const createRoleArgs = reactive<CreateRoleArgs>({
  alias: '',
  name: '',
  lexeme: '',
})

const createRole = async () => {
  try {
    const { alias, name, lexeme } = createRoleArgs
    const createdRole = await roleService.createRole({ alias, name, lexeme })

    notification.success({ message: 'Role created' })
    emit('role-created', createdRole)
  } catch (error) {
    notification.error({ message: error.message })
  }
}
</script>

<template>
  <q-card v-if="canFn(['role:create_role'])" bordered flat>
    <q-card-section>
      <q-form class="q-gutter-lg" @submit="createRole">
        <h3 class="text-h4">{{ dictionary.Create_role}}</h3>
        <q-input
          v-model="createRoleArgs.alias"
          :label="dictionary.Alias"
          lazy-rules
          outlined
          dense
          hide-bottom-space
          :rules="[requiredRule]"
        />
        <q-input
          v-model="createRoleArgs.name"
          :label="dictionary.Name"
          lazy-rules
          outlined
          dense
          hide-bottom-space
          :rules="[requiredRule]"
        />
        <q-input
          v-model="createRoleArgs.lexeme"
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
