import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

type Variant = 'default' | 'success' | 'warning' | 'error' | 'outline'

const variants: Record<Variant, string> = {
  default: 'bg-accent-muted text-accent',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  error: 'bg-error-muted text-error',
  outline: 'border border-border text-text-secondary',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
