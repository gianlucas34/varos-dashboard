import { ArrowUpRight } from 'lucide-react'

export const HomeMetric = () => (
  <div className="flex flex-col w-53 bg-foreground border border-border p-4 gap-y-3 text-sm rounded-md">
    <span>Total de clientes</span>
    <div className="flex items-center gap-x-[0.3rem]">
      <span className="text-4xl font-medium">128</span>
      <ArrowUpRight className="stroke-primary size-7" />
    </div>
    <span>nos últimos 7 dias</span>
  </div>
)
