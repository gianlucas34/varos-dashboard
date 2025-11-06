'use client'
import { useState } from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/command'
import { Label } from '@/components/label'
import { cn } from '@/utils'

type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  name: string
  label?: string
  placeholder: string
  options: Option[]
  error?: string
  defaultValue?: string[]
  className?: string
  contentClassName?: string
}

export const MultiSelect = ({
  name,
  placeholder,
  options,
  label,
  error,
  className,
  contentClassName,
  defaultValue = [],
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>(defaultValue)

  return (
    <div>
      {!!label && <Label className="text-detail mb-2">{label}</Label>}
      {value.map((val) => (
        <input key={val} type="hidden" name={name} value={val} />
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            aria-controls="options"
            className={cn(
              'flex items-center justify-between w-full bg-foreground border border-border px-4 py-2.5 gap-x-4 rounded-md shadow-md outline-none whitespace-nowrap transition-[color,box-shadow] focus:ring-1 focus:ring-detail disabled:cursor-not-allowed disabled:opacity-50 h-10',
              !!error && 'mb-1',
              className,
            )}
          >
            <div className="flex flex-1 whitespace-nowrap overflow-hidden mr-3 gap-x-1.5 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2">
              {value?.length ? (
                value.map((val) => (
                  <div
                    key={val}
                    className="px-2 py-1 rounded-full text-xs bg-zinc-700"
                  >
                    {options.find((option) => option.value === val)?.label}
                  </div>
                ))
              ) : (
                <span className="text-detail">{placeholder}</span>
              )}
            </div>
            <ChevronDownIcon className="size-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          id="options"
          className={cn(
            'w-(--radix-popover-trigger-width) relative p-0 max-h-96 bg-foreground border border-border rounded-md shadow-md overflow-x-hidden overflow-y-auto z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            contentClassName,
          )}
        >
          <Command>
            <CommandList className="max-h-96">
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value)

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        const newValue = isSelected
                          ? value.filter((item) => item !== option.value)
                          : [...value, option.value]

                        setValue(newValue)
                      }}
                      className={cn(
                        'text-text hover:bg-gray-200/4 mb-1',
                        isSelected && 'bg-gray-200/4',
                      )}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <span className="absolute right-2 flex size-3.5 items-center justify-center">
                          <CheckIcon className="size-4" />
                        </span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {!!error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
