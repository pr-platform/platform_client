import Service from '@/services/Service'
import { AxiosInstance } from 'axios'
import {
  GetRoleResponse,
  CreateRoleArgs,
  CreateRoleResponse,
} from '../types'

class RoleService extends Service {
  declare axios: AxiosInstance

  public async getRoles(): Promise<any> {
    const { data } = await this.axios.get<any>('/roles')

    return data
  }

  public async getRole(id: number): Promise<GetRoleResponse> {
    const { data } = await this.axios.get<GetRoleResponse>(`/roles/${id}`)

    return data
  }

  public async createRole(createRoleArgs: CreateRoleArgs): Promise<CreateRoleResponse> {
    const { data } = await this.axios.post<CreateRoleResponse>('/roles', createRoleArgs)

    return data
  }
}

export default new RoleService()
