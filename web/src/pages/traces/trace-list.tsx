import { Card } from '@/components/ui/card'
import { Activity } from 'lucide-react'

export function TraceList() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-text">Traces</h1>
      <Card className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-text-muted">
          <Activity className="h-10 w-10" />
          <p className="text-sm">Distributed tracing coming soon</p>
          <p className="text-xs">View request traces with SQL, RPC, DataLoader timing</p>
        </div>
      </Card>
    </div>
  )
}
