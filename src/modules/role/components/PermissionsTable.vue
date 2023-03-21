<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'
import { useLangStore } from '@/modules/lang/store'
import { useUserStore } from '@/modules/user/store'
import { storeToRefs } from 'pinia'
import roleService from '../services'
import { Permission, GetRoleResponse, MatchedPermission } from '../types'

const $q = useQuasar()
const langStore = useLangStore()
const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
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

const rolePermissions = ref<Permission[]>([])

const getRolePermissions = async (id: number) => {
  try {
    const role = await roleService.getRole(id, {
      include_permissions: true,
    })
    selectedRole.value = role
    rolePermissions.value = role.permissions
  } catch (error) {
    notification.error({ message: error.message })
  }
}

const matchedPermissions = ref<MatchedPermission[]>([])

const matchPermissions = () => {
  matchedPermissions.value = permissions.value.map((permission) => {
    return {
      ...permission,
      isCheck: !!rolePermissions.value.find(rolePermission => rolePermission.id === permission.id),
    }
  })
}

const changeRole = async (role: GetRoleResponse) => {
  await getRolePermissions(role.id)
  matchPermissions()
}

const selectedPermissions = ref<number[]>([])

const unselectedPermissions = ref<number[]>([])

const togglePermission = (permission: MatchedPermission) => {
  const existPermission = rolePermissions.value.find(rolePermission => rolePermission.id === permission.id)

  if (existPermission?.id) {
    if (permission.isCheck) {
      unselectedPermissions.value = selectedPermissions.value.filter(selectedPermission => selectedPermission !== permission.id)
    } else {
      unselectedPermissions.value.push(permission.id)
      selectedPermissions.value = selectedPermissions.value.filter(selectedPermission => selectedPermission !== permission.id)
    }
  } else {
    if (permission.isCheck) {
      selectedPermissions.value.push(permission.id)
      unselectedPermissions.value = selectedPermissions.value.filter(selectedPermission => selectedPermission !== permission.id)
    } else {
      selectedPermissions.value = selectedPermissions.value.filter(selectedPermission => selectedPermission !== permission.id)
    }
  }
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

const savePermissions = async () => {
  try {
    if (selectedPermissions.value.length) {
      await roleService.setPermissions({
        roleId: selectedRole.value.id,
        permissionIds: selectedPermissions.value,
      })
    }

    if (unselectedPermissions.value.length) {
      await roleService.unsetPermissions({
        roleId: selectedRole.value.id,
        permissionIds: unselectedPermissions.value,
      })
    }
  } catch (error: any) {
    notification.error({ message: error.message })
  }
}

onMounted(async () => {
  await getAllPermissions()
  await getRolePermissions(profile.value.roleId)
  matchPermissions()
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
        :rows="matchedPermissions"
        class="q-mb-md"
      >
        <template #header-cell-actions>
          <th>
            <q-select
              v-model="selectedRole"
              :options="roles"
              option-value="id"
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
              v-model="row.isCheck"
              outlined
              dense
              hide-bottom-space
              @update:model-value="togglePermission(row)"
            />
          </td>
        </template>
      </q-table>
      <q-btn unelevated type="submit" color="primary" @click="savePermissions">{{ dictionary.Save }}</q-btn>
    </q-card-section>
  </q-card>
</template>
