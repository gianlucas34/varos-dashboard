import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Button, Table } from '@/components'
import { HomeMetric } from '@/app/(home)/metric'
import { HomeFilters } from '@/app/(home)/filters'

export default function Home() {
  return (
    <div>
      <header className="w-full h-16 px-8 py-6 border-b border-b-border">
        <Image src="/logo.png" alt="Varos Logo" width={100} height={18} />
      </header>
      <main className="px-50 py-18">
        <h1 className="text-gray-100 text-3xl font-bold mb-8">Dashboard</h1>
        <div className="flex items-center justify-between mb-6">
          <HomeMetric />
          <div className="flex flex-col gap-y-3">
            <Button className="self-end">
              <span>Criar usuário</span>
              <Plus />
            </Button>
            <HomeFilters />
          </div>
        </div>
        <Table
          data={[]}
          columns={[
            { header: 'Nome', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Telefone', accessor: 'phone' },
            { header: 'CPF', accessor: 'cpf' },
            { header: 'Idade', accessor: 'age' },
            { header: 'Endereço', accessor: 'address' },
            { header: 'Criado em', accessor: 'createdAt' },
            { header: 'Atualizado em', accessor: 'updatedAt' },
          ]}
        />
      </main>
    </div>
  )
}
