import { useTranslation } from 'react-i18next'
import { Card, CardTitle } from '@/components/ui/card'
import { BarChart3, Clock, AlertTriangle } from 'lucide-react'

export function MetricsDashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-text">{t('metrics.title')}</h1>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted">
              <BarChart3 className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">12.4K</p>
              <p className="text-xs text-text-muted">{t('metrics.requestsPerMin')}</p>
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
              <p className="text-xs text-text-muted">{t('metrics.p95Latency')}</p>
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
              <p className="text-xs text-text-muted">{t('metrics.errorRate')}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="flex h-64 items-center justify-center">
          <CardTitle className="text-text-muted">{t('metrics.requestRateChart')} ({t('common.comingSoon')})</CardTitle>
        </Card>
        <Card className="flex h-64 items-center justify-center">
          <CardTitle className="text-text-muted">{t('metrics.latencyChart')} ({t('common.comingSoon')})</CardTitle>
        </Card>
      </div>
    </div>
  )
}
