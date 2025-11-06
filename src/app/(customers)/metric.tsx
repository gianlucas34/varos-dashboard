import { ArrowUpRight } from 'lucide-react'
import { prisma } from '@/lib'

export const CustomersMetric = async () => {
  const lastWeekTotalCustomers = await prisma.user.count({
    where: {
      role: 'CUSTOMER',
      created_at: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  return (
    <div className="flex flex-col w-53 bg-foreground border border-border p-4 gap-y-3 text-sm rounded-md">
      <span>Total de clientes</span>
      <div className="flex items-center gap-x-[0.3rem]">
        <span className="text-4xl font-medium">{lastWeekTotalCustomers}</span>
        <ArrowUpRight className="stroke-primary size-7" />
      </div>
      <span>nos últimos 7 dias</span>
    </div>
  )
}
