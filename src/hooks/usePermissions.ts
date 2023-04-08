import { useLoginStore } from '@/store/login/login'

export function usePermissions(current: string) {
  const { userPermissions } = useLoginStore()
  return !!userPermissions.find((item) => item.includes(current))
}
