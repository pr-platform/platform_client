export type GetLangsResponse = {}

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
  createdAt?: string,
  updatedAt?: string,
  translations?: GetTranslationResponse[],
}

export type Dictionary = {
  [key: string]: string,
}