import { GetAccessTokenArgs, GetAccessTokenResponse } from '../types/index';
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
}

export default new AuthService()
