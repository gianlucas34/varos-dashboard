import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { prisma } from '@/lib'
import { Button, Table } from '@/components'
import { CustomersMetric } from '@/app/(customers)/metric'
import { CustomersFilters } from '@/app/(customers)/filters'

export default async function CustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: 'CUSTOMER' },
    include: { address: true },
  })
  const data = customers.map((customer) => ({
    ...customer,
    age: `${customer.age} anos`,
    address: customer.address?.street,
    created_at: `${customer.created_at.toLocaleDateString(
      'pt-BR',
    )} às ${customer.created_at.toLocaleTimeString('pt-BR').slice(0, 5)}h`,
    updated_at: `${customer.updated_at.toLocaleDateString(
      'pt-BR',
    )} às ${customer.updated_at.toLocaleTimeString('pt-BR').slice(0, 5)}h`,
  }))

  return (
    <div>
      <header className="w-full h-16 px-8 py-6 border-b border-b-border">
        <Image src="/logo.png" alt="Varos Logo" width={100} height={18} />
      </header>
      <main className="px-50 py-18">
        <h1 className="text-gray-100 text-3xl font-bold mb-8">Dashboard</h1>
        <div className="flex items-center justify-between mb-6">
          <CustomersMetric />
          <div className="flex flex-col gap-y-3">
            <Link href={'/users/create'} className="self-end">
              <Button>
                <span>Criar usuário</span>
                <Plus />
              </Button>
            </Link>
            <CustomersFilters />
          </div>
        </div>
        <Table
          data={data}
          columns={[
            { header: 'Nome', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Telefone', accessor: 'phone' },
            { header: 'CPF', accessor: 'cpf' },
            { header: 'Idade', accessor: 'age' },
            { header: 'Endereço', accessor: 'address' },
            { header: 'Criado em', accessor: 'created_at' },
            { header: 'Atualizado em', accessor: 'updated_at' },
          ]}
          getRowHref={(row) => `/users/update/${row.id}`}
        />
      </main>
    </div>
  )
}
