import { UserGetPayload } from '@/generated/prisma/models'
import { prisma } from '@/lib'
import { UpsertUserForm } from '@/app/users/upsert/form'

type UpsertUserPageHandlerProps = {
  currentUserData?: UserGetPayload<{
    include: {
      address: true
    }
  }>
}

export const UpsertUserPageHandler = async ({
  currentUserData,
}: UpsertUserPageHandlerProps) => {
  const customers = await prisma.user.findMany({
    where: { role: 'CUSTOMER' },
  })

  return (
    <main className="flex flex-1 items-center justify-center">
      <UpsertUserForm currentUserData={currentUserData} customers={customers} />
    </main>
  )
}
