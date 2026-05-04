import { Card, CardTitle } from '@/components/ui/card'
import { BarChart3, Clock, AlertTriangle } from 'lucide-react'

export function MetricsDashboard() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-text">Overview</h1>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted">
              <BarChart3 className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">12.4K</p>
              <p className="text-xs text-text-muted">Requests / min</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-muted">
              <Clock className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">45ms</p>
              <p className="text-xs text-text-muted">P95 Latency</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-error-muted">
              <AlertTriangle className="h-4 w-4 text-error" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">0.3%</p>
              <p className="text-xs text-text-muted">Error Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="h-64 flex items-center justify-center">
          <CardTitle className="text-text-muted">Request Rate Chart (coming soon)</CardTitle>
        </Card>
        <Card className="h-64 flex items-center justify-center">
          <CardTitle className="text-text-muted">Latency Chart (coming soon)</CardTitle>
        </Card>
      </div>
    </div>
  )
}
