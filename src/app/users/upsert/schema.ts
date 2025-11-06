import { z } from 'zod'
import { Role } from '@database/generated/enums'

export const upsertUserSchema = z.object({
  name: z.string().min(1, { error: 'O nome deve ser informado!' }),
  email: z.string().min(1, { error: 'O email deve ser informado!' }),
  phone: z
    .string()
    .min(1, { error: 'O número de telefone deve ser informado!' })
    .length(11, { error: 'O número de telefone deve conter 11 dígitos!' }),
  cpf: z
    .string()
    .min(1, { error: 'O CPF deve ser informado!' })
    .length(11, { error: 'O CPF deve conter 11 dígitos!' }),
  age: z.number().min(1, { error: 'A idade deve ser informada!' }),
  role: z.enum(Role, { error: 'Tipo de usuário inválido!' }),
  customers: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().min(1, { error: 'O endereço deve ser informado!' }),
    state: z.string().min(1, { error: 'O nome do estado deve ser informado!' }),
    zipCode: z
      .string()
      .min(1, { error: 'O CEP deve ser informado!' })
      .length(8, { error: 'O CEP deve conter 8 dígitos!' }),
    complement: z.string().optional(),
  }),
})

export type UpsertUserSchemaType = z.infer<typeof upsertUserSchema>
