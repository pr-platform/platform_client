import {
  GetAccessTokenArgs,
  GetAccessTokenResponse,
  RegistrationArgs,
  RegistrationResponse,
  VerifiedArgs,
  VerifiedResponse
} from '../types';
import Service from '@/services/Service'
import { AxiosInstance } from 'axios';

class AuthService extends Service {
  declare axios: AxiosInstance

  public async getAccessToken(getAccessTokenArgs: GetAccessTokenArgs): Promise<GetAccessTokenResponse> {
    if (!getAccessTokenArgs.email) {
      throw new Error('Email is required')
    }

    if (!getAccessTokenArgs.password) {
      throw new Error('Password is required')
    }

    const { data } = await this.axios.post<GetAccessTokenResponse>('/auth/login', getAccessTokenArgs)

    if (data && !data.access_token) {
      throw new Error('Error')
    }

    return data
  }

  public async registration(registrationArgs: RegistrationArgs): Promise<RegistrationResponse> {
    if (!registrationArgs.email) {
      throw new Error('Email is required')
    }

    if (!registrationArgs.password) {
      throw new Error('Password is required')
    }

    const { data } = await this.axios.post<RegistrationResponse>('/auth/registration', registrationArgs)

    if (data.message !== 'ok') {
      throw new Error('Registration faild')
    }

    return data
  }

  public async verified(verifiedArgs: VerifiedArgs): Promise<VerifiedResponse> {
    if (!verifiedArgs.verified_token) {
      throw new Error('Token is required')
    }

    const { data } = await this.axios.post<VerifiedResponse>('/auth/verified', verifiedArgs)

    if (data.message !== 'ok') {
      throw new Error('Verified failed')
    }

    return data
  }
}

export default new AuthService()
