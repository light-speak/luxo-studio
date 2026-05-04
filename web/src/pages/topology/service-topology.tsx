import { Card } from '@/components/ui/card'
import { Network } from 'lucide-react'

export function ServiceTopology() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-text">Service Topology</h1>
      <Card className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-text-muted">
          <Network className="h-10 w-10" />
          <p className="text-sm">Topology graph coming soon</p>
          <p className="text-xs">Gateway → Service latency and RPM visualization</p>
        </div>
      </Card>
    </div>
  )
}
