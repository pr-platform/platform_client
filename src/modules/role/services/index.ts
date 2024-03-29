import Service from '@/services/Service'
import { AxiosInstance } from 'axios'
import {
  GetRoleResponse,
  CreateRoleArgs,
  CreateRoleResponse,
  Permission,
  GetRoleArgs,
  GetRolesArgs,
  SetPermissionsArgs,
  UnsetPermissionsArgs,
} from '../types'

class RoleService extends Service {
  declare axios: AxiosInstance

  public async getRoles(getRolesArgs?: GetRolesArgs): Promise<GetRoleResponse[]> {
    const { data } = await this.axios.get<GetRoleResponse[]>('/roles', {
      params: {
        ...getRolesArgs,
      },
    })

    return data
  }

  public async getRole(id: number, getRoleArgs?: GetRoleArgs): Promise<GetRoleResponse> {
    const { data } = await this.axios.get<GetRoleResponse>(`/roles/${id}`, {
      params: {
        ...getRoleArgs,
      },
    })

    return data
  }

  public async createRole(createRoleArgs: CreateRoleArgs): Promise<CreateRoleResponse> {
    const { data } = await this.axios.post<CreateRoleResponse>('/roles', createRoleArgs)

    return data
  }

  public async getPermissions(): Promise<Permission[]> {
    const { data } = await this.axios.get<Permission[]>('/roles/permissions/find-all')

    return data
  }

  public async setPermissions(setPermissionsArgs: SetPermissionsArgs) {
    const { data } = await this.axios.put('/roles/permissions/set-permissions', setPermissionsArgs)

    return data
  }

  public async unsetPermissions(unsetPermissionsArgs: UnsetPermissionsArgs) {
    const { data } = await this.axios.put('/roles/permissions/unset-permissions', unsetPermissionsArgs)

    return data
  }
}

export default new RoleService()
