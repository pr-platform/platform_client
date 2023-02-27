import Service from '@/services/Service'
import { AxiosInstance } from 'axios'
import {
  GetLangsResponse,
  GetOneLangArgs,
  GetOneLangResponse,
  Dictionary,
} from '../types'

class LangService extends Service {
  declare axios: AxiosInstance

  public cache: any = {
    profile: {},
  }

  public async getLangs(): Promise<GetLangsResponse> {
    const { data } = await this.axios.get<GetLangsResponse>('/lang')

    return data
  }

  public async getOneLang(getOneLangArgs: GetOneLangArgs): Promise<GetOneLangResponse> {
    const { data } = await this.axios.get<GetOneLangResponse>('/lang/find-one', {
      params: getOneLangArgs,
    })

    return data
  }

  public async getDictionary(getOneLangArgs: GetOneLangArgs) : Promise<Dictionary> {
    const lang = await this.getOneLang(getOneLangArgs)

    const data = {}

    lang.translations.forEach(translation => {
      data[translation.lexeme.lexeme] = translation.translation
    })

    return data
  }
}

export default new LangService()
