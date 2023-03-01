<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, watch } from 'vue'
import { GetProfileResponse } from '../types'
import { requiredRule, emailRule, minLengthRule } from '@/rules'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'

export interface UserProps {
  user?: GetProfileResponse,
}

const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)

const emit = defineEmits(['save'])

const props = withDefaults(defineProps<UserProps>(), {
  user: () => ({
    id: null,
    email: '',
    firstname: null,
    lastname: null,
    verified: false,
    blocked: true,
    roleId: null,
  }),
})

const save = () => {
  emit('save', props.user)
}
</script>

<template>
  <div class="row">
    <div class="col col-12 col-xl-4">
      <q-card bordered flat>
        <q-card-section>
          <q-form class="q-gutter-lg" @submit="save">
            <h3 class="text-h6">{{ dictionary.Common_data }}</h3>
            <q-input
              v-model="user.email"
              label="E-mail"
              lazy-rules
              outlined
              dense
              hide-bottom-space
              :rules="[requiredRule, emailRule]"
            />
            <q-input
              v-model="user.firstname"
              :label="dictionary.Firstname"
              outlined
              dense
            />
            <q-input
              v-model="user.lastname"
              :label="dictionary.Lastname"
              outlined
              dense
            />
            <q-btn unelevated type="submit" color="primary">{{ dictionary.Save }}</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
