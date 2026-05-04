import { Card } from '@/components/ui/card'
import { Play } from 'lucide-react'

export function Playground() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-text">API Playground</h1>
      <Card className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-text-muted">
          <Play className="h-10 w-10" />
          <p className="text-sm">Playground coming soon</p>
          <p className="text-xs">Construct requests, select fields, execute against target service</p>
        </div>
      </Card>
    </div>
  )
}
