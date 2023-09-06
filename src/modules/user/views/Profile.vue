<script setup lang="ts">
import User from '../components/User.vue'
import { ref, onMounted, reactive } from 'vue'
import userService from '../services'
import { useUserStore } from '../store'
import { GetProfileResponse } from '../types'

const profile = ref<GetProfileResponse>({
  id: null,
  email: '',
  firstname: null,
  lastname: null,
  verified: false,
  blocked: true,
  roleId: null,
  createdAt: '',
  updatedAt: '',
})

const saveProfile = (event) => {
  console.log('Save profile', event)
}

const save = (user) => {
  console.log(user.firstname)
}

onMounted(async () => {
  profile.value = await userService.fetchProfile()
})
</script>

<template>
  <h1 class="text-h4 q-mt-none">Profile</h1>
  <User :user="profile" @save="save" @save-profile="saveProfile" />
</template>
