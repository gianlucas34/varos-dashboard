import { cva, type VariantProps } from 'class-variance-authority'

const loadingVariants = cva(
  'inline-block animate-spin border-current border-t-transparent text-primary rounded-full',
  {
    variants: {
      size: {
        default: 'w-6 h-6 border-[3px]',
        md: 'w-8 h-8 border-[4px]',
        lg: 'w-10 h-10 border-[5px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

type LoadingProps = VariantProps<typeof loadingVariants>

export const Loading = ({ size }: LoadingProps) => (
  <div className="w-full h-full flex items-center justify-center">
    <div
      role="status"
      aria-label="loading"
      className={loadingVariants({ size })}
    />
  </div>
)
