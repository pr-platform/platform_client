import { defineStore } from 'pinia'
import { GetProfileResponse } from '../types'

interface State {
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
    }
  },
})
