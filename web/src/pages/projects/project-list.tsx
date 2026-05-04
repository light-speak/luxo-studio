import { Link } from 'react-router-dom'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusDot } from '@/components/shared/status-dot'
import { Plus, Folder, Zap } from 'lucide-react'

// Mock data 在后端接通前使用
const mockProjects = [
  { id: 1, name: 'E-Commerce API', mode: 'CLUSTER' as const, gateways: 2, services: 5, status: 'ONLINE' as const },
  { id: 2, name: 'Social Platform', mode: 'EMBEDDED' as const, gateways: 1, services: 0, status: 'ONLINE' as const },
  { id: 3, name: 'Internal Tools', mode: 'EMBEDDED' as const, gateways: 1, services: 0, status: 'OFFLINE' as const },
]

export function ProjectList() {
  return (
    <div className="min-h-screen bg-surface-0 p-8">
      {/* Header */}
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-semibold text-text">Projects</h1>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <Link key={project.id} to={`/${project.id}`}>
              <Card className="group cursor-pointer transition-colors hover:border-accent/30 hover:bg-surface-2">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-3">
                    <Folder className="h-5 w-5 text-text-secondary" />
                  </div>
                  <StatusDot status={project.status} />
                </div>

                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  {project.mode === 'CLUSTER'
                    ? `${project.gateways} gateways, ${project.services} services`
                    : 'Embedded mode'}
                </CardDescription>

                <div className="mt-4 flex items-center gap-2">
                  <Badge variant={project.mode === 'CLUSTER' ? 'default' : 'outline'}>
                    {project.mode.toLowerCase()}
                  </Badge>
                  <Badge variant={project.status === 'ONLINE' ? 'success' : 'outline'}>
                    {project.status.toLowerCase()}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
