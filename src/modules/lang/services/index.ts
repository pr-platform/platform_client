import Service from '@/services/Service'
import { AxiosInstance } from 'axios'
import {
  GetLangsResponse,
  GetOneLangArgs,
  GetOneLangResponse,
  Dictionary,
  CreateLangArgs,
  CreateLangResponse,
  GetAllLexemesArgs,
  CreateLexemeArgs,
  CreateLexemeResponse,
  CreateTranslationArgs,
  CreateTranslationResponse,
  UpdateTranslationArgs,
  UpdateTranslationResponse,
} from '../types'

class LangService extends Service {
  declare axios: AxiosInstance

  public cache: any = {
    profile: {},
  }

  public async getLangs(include_dictionary?: boolean): Promise<GetLangsResponse> {
    const { data } = await this.axios.get<GetLangsResponse>('/langs', {
      params: {
        include_dictionary,
      },
    })

    return data
  }

  public async getAllLexemes(getAllLexemesArgs?: GetAllLexemesArgs) {
    const { data } = await this.axios.get<GetLangsResponse>('/langs/lexemes', {
      params: getAllLexemesArgs,
    })

    return data
  }

  public async getOneLang(getOneLangArgs: GetOneLangArgs): Promise<GetOneLangResponse> {
    const { data } = await this.axios.get<GetOneLangResponse>('/langs/find-one', {
      params: getOneLangArgs,
    })

    return data
  }

  public async getDictionary(getOneLangArgs: GetOneLangArgs) : Promise<Dictionary> {
    const lang = await this.getOneLang(getOneLangArgs)

    const dictionary = {}

    lang.translations.forEach(translation => {
      dictionary[translation.lexeme.lexeme] = translation.translation
    })

    return {
      lang: {
        id: lang.id,
        lexeme: lang.lexeme,
        alias: lang.alias,
      },
      dictionary,
    }
  }

  public async createLang(createLangArgs: CreateLangArgs): Promise<CreateLangResponse> {
    const { data } = await this.axios.post<CreateLangResponse>('/langs', createLangArgs)

    return data
  }

  public async createLexeme(createLexemeArgs: CreateLexemeArgs): Promise<CreateLexemeResponse> {
    const { data } = await this.axios.post<CreateLexemeResponse>('/langs/lexeme', createLexemeArgs)

    return data
  }

  public async createTranslation(createTranslationArgs: CreateTranslationArgs): Promise<CreateTranslationResponse> {
    const { data } = await this.axios.post<CreateTranslationResponse>('/langs/translation', createTranslationArgs)

    return data
  }

  public async updateTranslation(id: number, updateTranslationArgs: UpdateTranslationArgs): Promise<UpdateTranslationResponse> {
    const { data } = await this.axios.put<UpdateTranslationResponse>(`/langs/translation/${id}`, updateTranslationArgs)

    return data
  }
}

export default new LangService()
