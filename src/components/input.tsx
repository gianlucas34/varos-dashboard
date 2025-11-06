import * as React from 'react'
import { Label } from '@/components/label'
import { cn } from '@/utils'

type InputProps = React.ComponentProps<'input'> & {
  label?: string
  error?: string
}

export function Input({ label, type, error, className, ...props }: InputProps) {
  return (
    <div>
      {!!label && <Label className="text-detail mb-2">{label}</Label>}
      <input
        type={type}
        data-slot="input"
        defaultValue=""
        className={cn(
          'w-full h-10 bg-foreground border border-border px-3 py-1 rounded-md shadow-md outline-none transition-[color,box-shadow] placeholder:text-detail disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:ring-1 focus-visible:ring-detail',
          !!error && 'mb-1',
          className,
        )}
        {...props}
      />
      {!!error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
