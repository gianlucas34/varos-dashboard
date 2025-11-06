import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

const buttonVariants = cva(
  'cursor-pointer flex items-center bg-button text-primary gap-x-4',
  {
    variants: {
      variant: {
        default: 'rounded-md',
        secondary: 'bg-gray-200/4 text-detail',
      },
      size: {
        default: 'h-14 p-4',
        lg: 'h-12 px-10 py-3 text-lg font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = ({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={cn(buttonVariants({ variant, size, className }))}
  >
    {children}
  </button>
)
