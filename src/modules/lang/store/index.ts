import { defineStore } from 'pinia'
import { Dictionary, GetOneLangResponse } from '../types'

interface State {
  currentLang: GetOneLangResponse | null,
  dictionary: Pick<Dictionary, 'dictionary'>,
}

export const useLangStore = defineStore('lang', {
  state: (): State => {
    return {
      currentLang: {
        id: null,
        alias: '',
        lexeme: '',
      },
      dictionary: {},
    }
  },
})
