import { Card } from '@/components/ui/card'
import { Server } from 'lucide-react'

export function ClusterStatus() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-text">Cluster</h1>
      <Card className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-text-muted">
          <Server className="h-10 w-10" />
          <p className="text-sm">Cluster management coming soon</p>
          <p className="text-xs">Monitor gateway and service node status</p>
        </div>
      </Card>
    </div>
  )
}
