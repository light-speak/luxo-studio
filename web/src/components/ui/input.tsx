import { cn } from '@/lib/cn'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'h-9 w-full rounded-lg border bg-surface-2 px-3 text-sm text-text',
          'placeholder:text-text-muted',
          'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent',
          'transition-colors',
          error ? 'border-error' : 'border-border',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}
