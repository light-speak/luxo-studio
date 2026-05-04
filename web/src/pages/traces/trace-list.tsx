import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Activity } from 'lucide-react'

export function TraceList() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-text">{t('traces.title')}</h1>
      <Card className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-text-muted">
          <Activity className="h-10 w-10" />
          <p className="text-sm">{t('common.comingSoon')}</p>
          <p className="text-xs">{t('traces.description')}</p>
        </div>
      </Card>
    </div>
  )
}
