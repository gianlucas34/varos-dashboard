import { Role } from '@database/generated/enums'

export const roleTranslations = {
  [Role.CONSULTANT]: 'Consultor',
  [Role.CUSTOMER]: 'Cliente',
} as const
