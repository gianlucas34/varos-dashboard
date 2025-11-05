import { cn } from '@/utils'

type ButtonProps = {
  className?: string
  children: React.ReactNode
}

export const Button = ({ className, children }: ButtonProps) => (
  <button
    className={cn(
      'cursor-pointer flex items-center gap-x-4 p-4 bg-button text-primary rounded-md',
      className,
    )}
  >
    {children}
  </button>
)
