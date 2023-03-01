export type GetProfileResponse = {
  id: number,
  email: string,
  firstname?: string | null,
  lastname?: string | null,
  verified: boolean,
  blocked: boolean,
  roleId: number,
  createdAt?: string,
  updatedAt?: string,
}
