'use client'
import * as React from 'react'
import { DateRange } from 'react-day-picker'
import { Label } from '@/components/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import { Calendar } from '@/components/calendar'
import { cn, formatRangeDate } from '@/utils'

type DatePickerProps = {
  label?: string
  placeholder: string
  value: DateRange | undefined
  onChange?: (value: DateRange | undefined) => void
  error?: string
  className?: string
  contentClassName?: string
}

export function DatePicker({
  label,
  placeholder,
  value,
  error,
  className,
  contentClassName,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const getDisplayValue = () => {
    if (value?.from) {
      return formatRangeDate(value.from, value.to)
    }

    return null
  }
  const handleSelect = (e: Date | DateRange | undefined) => {
    const range = e as DateRange | undefined
    const rangeOnChange = onChange as (range: DateRange | undefined) => void

    if (e === undefined) {
      rangeOnChange?.({
        from: undefined,
        to: undefined,
      })
      setOpen(false)

      return
    }

    rangeOnChange?.(range)
    if (range?.from && range?.to) setOpen(false)
  }

  const displayValue = getDisplayValue()

  return (
    <div>
      {!!label && <Label className="text-detail mb-2">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            'flex items-center justify-between w-full bg-foreground border border-border px-4 py-2.5 gap-x-2 rounded-md shadow-md outline-none focus:ring-1 focus:ring-detail disabled:cursor-not-allowed disabled:opacity-50',
            !!error && 'mb-1',
            className,
          )}
        >
          {displayValue ? (
            <span>{displayValue}</span>
          ) : (
            <span className="text-detail">{placeholder}</span>
          )}
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'bg-foreground border border-border rounded-md shadow-md p-2 z-50',
            contentClassName,
          )}
        >
          <Calendar
            mode="range"
            captionLayout="dropdown"
            selected={value}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
      {!!error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
