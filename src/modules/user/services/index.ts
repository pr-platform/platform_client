import Service from '@/services/Service'
import { AxiosInstance } from 'axios'
import { GetProfileResponse, GetProfileArgs } from '../types'

class UserService extends Service {
  declare axios: AxiosInstance

  public cache: any = {
    profile: {},
  }

  public async fetchProfile(getProfileArgs?: GetProfileArgs): Promise<GetProfileResponse> {
    const { data } = await this.axios.get<GetProfileResponse>('/users/profile', {
      params: {
        ...getProfileArgs,
      },
    })

    this.cache.profile = data

    return data
  }

  public async getProfile(getProfileArgs?: GetProfileArgs): Promise<GetProfileResponse> {
    return await this.fetchProfile(getProfileArgs)
  }
}

export default new UserService()
