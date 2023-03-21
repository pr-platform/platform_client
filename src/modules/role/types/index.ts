export type CreateRoleArgs = {
  alias: string,
  name: string,
  lexeme: string,
}

export type CreateRoleResponse = {}

export type Permission = {
  id: number,
  alias: string,
  name: string,
  lexeme: string,
  createdAt: string,
  updatedAt: string,
}

export type GetRoleResponse = {
  id: number,
  alias: string,
  name: string,
  lexeme: string,
  permissions: Permission[],
}

export type GetRoleArgs = {
  include_permissions?: boolean,
}

export type GetRolesArgs = {
  include_permissions?: boolean,
}

export type MatchedPermission = Pick<Permission, 'id' | 'alias' | 'name' | 'lexeme'> & {
  isCheck: boolean,
}

export type SetPermissionsArgs = {
  roleId: number,
  permissionIds: number[],
}

export type UnsetPermissionsArgs = {
  roleId: number,
  permissionIds: number[],
}
