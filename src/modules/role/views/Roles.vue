<script setup lang="ts">
import CreateRoleForm from '../components/CreateRole.vue'
import PermissionsTable from '../components/PermissionsTable.vue'
</script>

<template>
  <div class="row">
    <div class="col col-12 q-mb-md">
      <CreateRoleForm class="q-mb-md" />
      <PermissionsTable />
    </div>
  </div>
</template>
