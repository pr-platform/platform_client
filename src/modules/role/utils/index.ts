import { useUserStore } from '@/modules/user/store'
import { storeToRefs } from 'pinia'

export const can = () => {
  const userStore = useUserStore()
  const { profile } = storeToRefs(userStore)
  const permissions = profile.value?.role?.permissions?.map(permission => permission.alias)

  // console.log(permissions)

  return (canPermissions: string[]) => permissions.includes(...canPermissions)
}
