export type GetAccessTokenArgs = {
  email: string,
  password: string,
}

export type GetAccessTokenResponse = {
  access_token: string,
}

export type RegistrationArgs = {
  email: string,
  password: string,
}

export type RegistrationResponse = {
  message: string,
}

export type VerifiedArgs = {
  verified_token: string,
}

export type VerifiedResponse = {
  message: string,
}