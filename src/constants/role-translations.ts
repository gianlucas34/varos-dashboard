import { Role } from '@/app/generated/prisma/enums'

export const roleTranslations = {
  [Role.CONSULTANT]: 'Consultor',
  [Role.CUSTOMER]: 'Cliente',
} as const
