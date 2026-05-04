import { cn } from '@/lib/cn'

const colors = {
  ONLINE: 'bg-success',
  OFFLINE: 'bg-text-muted',
  ERROR: 'bg-error',
} as const

export function StatusDot({ status }: { status: keyof typeof colors }) {
  return (
    <span className={cn('inline-block h-2 w-2 rounded-full', colors[status])} />
  )
}
