import { defineStore } from 'pinia'
import { Dictionary } from '../types'

interface State {
  dictionary: Dictionary
}

export const useLangStore = defineStore('lang', {
  state: (): State => {
    return {
      dictionary: {},
    }
  },
})
