'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { DateRange } from 'react-day-picker'
import { DatePicker, Select } from '@/components'
import { parseDateRangeFromQuery } from '@/utils'
import { UserModel } from '@/app/generated/prisma/models'

type CustomersFiltersProps = {
  consultants: UserModel[]
}

export const CustomersFilters = ({ consultants }: CustomersFiltersProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`?${params.toString()}`)
  }
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return

    const params = new URLSearchParams(searchParams.toString())

    params.set('start-date', range.from.toLocaleDateString('pt-BR'))
    params.set('end-date', range.to.toLocaleDateString('pt-BR'))
    router.push(`?${params.toString()}`)
  }

  const range = parseDateRangeFromQuery(
    searchParams.get('start-date'),
    searchParams.get('end-date'),
  )

  return (
    <div className="flex items-center gap-x-6 p-4 border border-border rounded-md text-gray-200">
      <div className="flex items-center gap-x-2">
        <span>Nome do consultor</span>
        <Select
          placeholder="John Doe"
          options={consultants.map((consultant) => ({
            label: consultant.name,
            value: consultant.name,
          }))}
          value={searchParams.get('consultant-name') || ''}
          onValueChange={(value) =>
            handleFilterChange('consultant-name', value)
          }
          className="w-fit bg-gray-200/4 text-sm"
          contentClassName="bg-background"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <span>Email do consultor</span>
        <Select
          placeholder="johndoe@gm..."
          options={consultants.map((consultant) => ({
            label: consultant.email,
            value: consultant.email,
          }))}
          value={searchParams.get('consultant-email') || ''}
          onValueChange={(value) =>
            handleFilterChange('consultant-email', value)
          }
          className="w-fit bg-gray-200/4 text-sm"
          contentClassName="bg-background"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <span>Período</span>
        <DatePicker
          placeholder="21/10/2025 até 21/12/2025"
          value={range}
          onChange={handleDateRangeChange}
          className="w-fit bg-gray-200/4 text-sm"
          contentClassName="bg-background"
        />
      </div>
    </div>
  )
}
