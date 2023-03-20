<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'
import roleService from '../services'
import { Permission, GetRoleResponse } from '../types'

const $q = useQuasar()
const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)
const { currentLang } = storeToRefs(langStore)
const notification = notify($q)

const permissions = ref<Permission[]>([])

const getAllPermissions = async () => {
  try {
    permissions.value = await roleService.getPermissions()
  } catch (error) {
    notification.error({ message: error.message })
  }
}

const roles = ref<GetRoleResponse[]>([])

const fetchRoles = async () => {
  try {
    roles.value = await roleService.getRoles({
      include_permissions: true,
    })
  } catch (error) {
    notification.error({ message: error.message })
  }
}

const rolePermissions = ref([])

const getRole = async (id: number) => {
  try {
    const role = await roleService.getRole(id, {
      include_permissions: true,
    })
    rolePermissions.value = role.permissions
  } catch (error) {
    notification.error({ message: error.message })
  }
}

const changeRole = async (role: GetRoleResponse) => {
  await getRole(role.id)
}

const selectedRole = ref<GetRoleResponse>({
  id: null,
  alias: null,
  name: "",
  lexeme: "",
  permissions: [],
})

const columns = [
  {
    name: 'lexeme',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'lexeme',
  },
  {
    name: 'actions',
    required: true,
    label: '',
    align: 'left',
    field: 'actions',
  },
]

onMounted(async () => {
  await getAllPermissions()
  await fetchRoles()
})

defineExpose({
  fetchRoles,
})
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <q-table
        :columns="columns"
        row-key="lexeme"
        :rows="permissions"
      >
        <template #header-cell-actions>
          <th>
            <q-select
              v-model="selectedRole"
              :options="roles"
              :option-label="(val) => dictionary[val.lexeme] || val.name"
              :label="dictionary.Role"
              lazy-rules
              outlined
              dense
              hide-bottom-space
              @update:model-value="changeRole"
            />
          </th>
        </template>

        <template #body-cell-lexeme="{ row }">
          <td>{{ dictionary[row.lexeme] || row.name }}</td>
        </template>

        <template #body-cell-actions="{ row }">
          <td>
            <q-checkbox
              outlined
              dense
              hide-bottom-space
            />
          </td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
