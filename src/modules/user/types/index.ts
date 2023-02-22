export type GetProfileResponse = {
  id: number,
  email: string,
  firstName?: string | null,
  lastName?: string | null,
  verified: boolean,
  blocked: boolean,
  roleId: number,
  createdAt: string,
  updatedAt: string,
}
