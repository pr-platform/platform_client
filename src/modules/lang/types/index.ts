export type GetOneLangArgs = {
  where: any,
  include_dictionary: boolean,
}

export type GetLexemeResponse = {
  id: number,
  lexeme: string,
  createdAt?: string,
  updatedAt?: string,
}

export type GetTranslationResponse = {
  id: number,
  translation: string,
  langId: number,
  lexemeId: number,
  createdAt?: string,
  updatedAt?: string,
  lexeme?: GetLexemeResponse,
}

export type GetOneLangResponse = {
  id: number,
  alias: string,
  lexeme: string,
  createdAt?: string,
  updatedAt?: string,
  translations?: GetTranslationResponse[],
}

export type GetLangsResponse = GetOneLangResponse[]

export type Dictionary = {
  lang: GetOneLangResponse,
  dictionary: {
    [key: string]: string,
  }
}

export type CreateLangArgs = {
  alias: string,
  lexeme?: string,
}

export type CreateLangResponse = {
  id: number,
  alias: string,
  lexeme?: string,
}


export type GetAllLexemesArgs = {
  include_translations?: boolean,
  translations_lang_id?: number,
}

export type CreateLexemeArgs = {
  lexeme: string,
}

export type CreateLexemeResponse = {
  id: number,
  lexeme: string,
  updatedAt: string,
  createdAt: string,
}

export type CreateTranslationArgs = {
  translation: string,
  langId: number,
  lexemeId: number,
}

export type CreateTranslationResponse = {}
