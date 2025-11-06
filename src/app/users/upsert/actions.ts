'use server'
import { prisma } from '@/lib'
import { FormState } from '@/types'
import {
  upsertUserSchema,
  UpsertUserSchemaType,
} from '@/app/users/upsert/schema'

export const createUser = async (
  _: FormState<UpsertUserSchemaType>,
  formData: FormData,
): Promise<FormState<UpsertUserSchemaType>> => {
  try {
    const validatedData = validateFormData(formData)

    if (!validatedData.success) {
      return validatedData.error
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.data.email },
          { cpf: validatedData.data.cpf },
        ],
      },
      select: {
        email: true,
        cpf: true,
      },
    })

    if (existingUser) {
      return {
        message: 'Usuário já cadastrado com esse email ou CPF!',
        isError: true,
      }
    }

    const { address, customers, ...rest } = validatedData.data
    const { zipCode, ...restAddress } = address

    await prisma.user.create({
      data: {
        ...rest,
        address: {
          create: {
            ...restAddress,
            zip_code: zipCode,
          },
        },
        ...(customers && {
          customers: {
            connect: customers.map((id) => ({ id })),
          },
        }),
      },
    })

    return {
      message: 'Usuário criado com sucesso!',
      isError: false,
    }
  } catch (_error) {
    return {
      message: 'Erro inesperado ao criar o usuário!',
      isError: true,
    }
  }
}

export const updateUser = async (
  id: string,
  _: FormState<UpsertUserSchemaType>,
  formData: FormData,
): Promise<FormState<UpsertUserSchemaType>> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return {
        message: 'Usuário não encontrado!',
        isError: true,
      }
    }

    const validatedData = validateFormData(formData)

    if (!validatedData.success) {
      return validatedData.error
    }

    const { address, customers, ...rest } = validatedData.data
    const { zipCode, ...restAddress } = address

    await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        address: {
          update: {
            ...restAddress,
            zip_code: zipCode,
          },
        },
        ...(customers && {
          customers: {
            set: customers.map((id) => ({ id })),
          },
        }),
      },
    })

    return {
      message: 'Usuário atualizado com sucesso!',
      isError: false,
    }
  } catch (_error) {
    return {
      message: 'Erro inesperado ao atualizar o usuário!',
      isError: true,
    }
  }
}

type ValidateFormDataReturnProps =
  | {
      success: true
      data: UpsertUserSchemaType
    }
  | {
      success: false
      error: FormState<UpsertUserSchemaType>
    }

const validateFormData = (formData: FormData): ValidateFormDataReturnProps => {
  const formEntries = Object.fromEntries(formData.entries())
  const data = {
    name: formEntries.name,
    email: formEntries.email,
    phone: formEntries.phone,
    cpf: formEntries.cpf,
    age: Number(formEntries.age),
    role: formEntries.role,
    customers: formData.getAll('customers'),
    address: {
      street: formEntries['address.street'],
      state: formEntries['address.state'],
      zipCode: formEntries['address.zipCode'],
      complement: formEntries['address.complement'],
    },
  }
  const validatedData = upsertUserSchema.safeParse(data)

  if (!validatedData.success) {
    const validationErrors: Record<string, string> = {}

    validatedData.error.issues.forEach((issue) => {
      const path = issue.path.join('.')

      if (!validationErrors[path]) {
        validationErrors[path] = issue.message
      }
    })

    return {
      success: false,
      error: {
        validationErrors,
        isError: true,
      },
    }
  }

  return {
    success: true,
    data: validatedData.data,
  }
}
