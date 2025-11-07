'use client'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserGetPayload, UserModel } from '@/generated/prisma/models'
import { Role } from '@/generated/prisma/enums'
import { roleTranslations, statesOfBrazil } from '@/constants'
import { Button, Input, Loading, MultiSelect, Select, Tabs } from '@/components'
import { createUser, updateUser } from '@/app/users/upsert/actions'

type UpsertUserFormProps = {
  currentUserData?: UserGetPayload<{
    include: {
      address: true
    }
  }>
  customers: UserModel[]
}

export const UpsertUserForm = ({
  currentUserData,
  customers,
}: UpsertUserFormProps) => {
  const isUpdate = !!currentUserData
  const action = isUpdate
    ? updateUser.bind(null, currentUserData.id)
    : createUser

  const router = useRouter()
  const [formState, formAction, isPending] = useActionState(action, null)
  const [role, setRole] = useState<Role | undefined>(currentUserData?.role)

  useEffect(() => {
    if (formState && !formState.isError) {
      router.push('/')
    }
  }, [formState, router])

  return (
    <form className="w-208 my-4 border border-border rounded-2xl shadow-md">
      <div className="flex items-center justify-end gap-x-2.5 px-2.5 py-4 border-b border-b-border">
        <Button size="lg" className="rounded-full" formAction={formAction}>
          {isPending ? (
            <Loading />
          ) : isUpdate ? (
            'Atualizar usuário'
          ) : (
            'Criar usuário'
          )}
        </Button>
        {isUpdate && (
          <Button variant="secondary" size="lg" className="rounded-full">
            Deletar usuário
          </Button>
        )}
      </div>
      <div className="px-32 py-6">
        <h1 className="text-gray-100 text-xl font-medium mb-6">
          {isUpdate ? 'Atualizar usuário' : 'Criar usuário'}
        </h1>
        <div className="flex flex-col gap-y-6">
          <Select
            name="role"
            label="Tipo do usuário"
            placeholder="Selecione o tipo do usuário"
            options={Object.values(Role).map((role) => ({
              value: role,
              label: roleTranslations[role],
            }))}
            defaultValue={currentUserData?.role}
            error={formState?.validationErrors?.role}
            onValueChange={(value) => setRole(value as Role)}
          />
          <div className="grid grid-cols-2 gap-6">
            <Input
              name="name"
              label="Nome"
              placeholder="Digite o nome"
              defaultValue={currentUserData?.name}
              error={formState?.validationErrors?.name}
            />
            <Input
              name="phone"
              label="Telefone"
              placeholder="Digite o telefone"
              maxLength={11}
              defaultValue={currentUserData?.phone}
              error={formState?.validationErrors?.phone}
            />
          </div>
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Digite o email"
            defaultValue={currentUserData?.email}
            error={formState?.validationErrors?.email}
          />
        </div>
        <Tabs
          defaultValue="basic"
          triggers={[
            {
              value: 'basic',
              label: 'Informações básicas',
              content: (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      type="number"
                      name="age"
                      label="Idade"
                      placeholder="28 anos"
                      defaultValue={currentUserData?.age}
                      error={formState?.validationErrors?.age}
                    />
                    <Input
                      name="cpf"
                      label="CPF"
                      placeholder="000.000.000-00"
                      maxLength={11}
                      defaultValue={currentUserData?.cpf}
                      error={formState?.validationErrors?.cpf}
                    />
                    <Input
                      name="address.zipCode"
                      label="CEP"
                      placeholder="Insira o CEP"
                      maxLength={8}
                      defaultValue={currentUserData?.address?.zip_code}
                      error={formState?.validationErrors?.['address.zipCode']}
                    />
                    <Select
                      name="address.state"
                      label="Estado"
                      placeholder="Selecione o estado"
                      options={statesOfBrazil}
                      defaultValue={currentUserData?.address?.state}
                      error={formState?.validationErrors?.['address.state']}
                    />
                  </div>
                  <Input
                    name="address.street"
                    label="Endereço"
                    placeholder="Digite o endereço"
                    defaultValue={currentUserData?.address?.street}
                    error={formState?.validationErrors?.['address.street']}
                  />
                  <Input
                    name="address.complement"
                    label="Complemento"
                    placeholder="Digite o complemento"
                    defaultValue={
                      currentUserData?.address?.complement ?? undefined
                    }
                    error={formState?.validationErrors?.['address.complement']}
                  />
                </div>
              ),
            },
            {
              value: 'customers',
              label: 'Adicionar clientes',
              disabled: role !== Role.CONSULTANT,
              content: (
                <MultiSelect
                  name="customers"
                  label="Clientes"
                  placeholder="John Doe, Licon Doe, Steve Doe, Matt Do....."
                  options={customers.map((customer) => ({
                    value: customer.id,
                    label: customer.name,
                  }))}
                  error={formState?.validationErrors?.customers}
                />
              ),
            },
          ]}
        />
      </div>
    </form>
  )
}
