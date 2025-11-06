'use client'
import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils'

type Trigger = {
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  triggers: Trigger[]
}

export function Tabs({ triggers, className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={className} {...props}>
      <TabsList>
        {triggers.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {triggers.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsPrimitive.Root>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <div className="my-8">
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          'inline-flex items-center justify-center w-fit mb-4 gap-x-2',
          className,
        )}
        {...props}
      />
      <div className="w-full h-px bg-border" />
    </div>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'cursor-pointer inline-flex flex-1 items-center justify-center h-7.5 text-detail px-2 py-1 gap-1.5 rounded-md whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-zinc-700 data-[state=active]:text-text data-[state=active]:shadow-md',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      forceMount
      data-slot="tabs-content"
      className={cn(
        'flex-1 outline-none data-[state=inactive]:hidden',
        className,
      )}
      {...props}
    />
  )
}
