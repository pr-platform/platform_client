import { defineStore } from 'pinia'
import { GetProfileResponse } from '../types'

interface State {
  profile: GetProfileResponse | null
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      profile: null,
    }
  },
})
