import { prisma } from '@/lib'
import { UpsertUserPageHandler } from '@/app/users/upsert/page-handler'

type UpdateUserPageParams = {
  params: Promise<{ id: string }>
}

export default async function UpdateUserPage({ params }: UpdateUserPageParams) {
  const { id } = await params
  const currentUserData = await prisma.user.findUnique({
    where: { id },
    include: { address: true },
  })

  if (!currentUserData) return null

  return <UpsertUserPageHandler currentUserData={currentUserData} />
}
