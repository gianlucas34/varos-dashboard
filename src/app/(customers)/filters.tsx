import { Select } from '@/components'

export const CustomersFilters = () => (
  <div className="flex items-center gap-x-6 p-4 border border-border rounded-md text-gray-200">
    <div className="flex items-center gap-x-2">
      <span>Nome do consultor</span>
      <Select
        placeholder="John Doe"
        options={[
          {
            label: 'John Doe',
            value: 'johndoe',
          },
          {
            label: 'Jane Doe',
            value: 'janedoe',
          },
        ]}
        className="w-fit bg-gray-200/4 text-sm"
        contentClassName="bg-background"
      />
    </div>
    <div className="flex items-center gap-x-2">
      <span>Email do consultor</span>
      <Select
        placeholder="johndoe@gm..."
        options={[
          {
            label: 'johndoe@gm...',
            value: 'johndoe',
          },
          {
            label: 'janedoe@gm...',
            value: 'janedoe',
          },
        ]}
        className="w-fit bg-gray-200/4 text-sm"
        contentClassName="bg-background"
      />
    </div>
    <div className="flex items-center gap-x-2">
      <span>Período</span>
    </div>
  </div>
)
