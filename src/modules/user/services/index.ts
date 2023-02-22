import Service from '@/services/Service'
import { AxiosInstance } from 'axios'
import { GetProfileResponse } from '../types'

class UserService extends Service {
  declare axios: AxiosInstance

  public cache: any = {
    profile: {},
  }

  public async fetchProfile(): Promise<GetProfileResponse> {
    const { data } = await this.axios.get<GetProfileResponse>('/users/profile')

    this.cache.profile = data

    return data
  }

  public async getProfile(): Promise<GetProfileResponse> {
    return await this.fetchProfile()
  }
}

export default new UserService()
