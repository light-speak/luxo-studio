import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Database, ChevronRight, Search, Box, List, Hash, Type, ToggleLeft, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/cn'

// Mock schema data
const mockSchema = {
  models: [
    {
      name: 'User',
      fields: [
        { name: 'id', type: 'Int', nullable: false, directives: ['@id', '@auto'] },
        { name: 'name', type: 'String', nullable: false, directives: ['@varchar(100)'] },
        { name: 'email', type: 'String', nullable: false, directives: ['@unique', '@email'] },
        { name: 'password', type: 'String', nullable: false, directives: ['@hidden', '@hash'] },
        { name: 'role', type: 'Role', nullable: false, directives: ['@filterable'] },
        { name: 'avatar', type: 'String', nullable: true, directives: [] },
        { name: 'posts', type: '[Post]', nullable: false, directives: [] },
      ],
    },
    {
      name: 'Post',
      fields: [
        { name: 'id', type: 'Int', nullable: false, directives: ['@id', '@auto'] },
        { name: 'title', type: 'String', nullable: false, directives: [] },
        { name: 'content', type: 'String', nullable: true, directives: [] },
        { name: 'userId', type: 'Int', nullable: false, directives: ['@by(User)'] },
        { name: 'status', type: 'PostStatus', nullable: false, directives: ['@filterable'] },
        { name: 'createdAt', type: 'DateTime', nullable: false, directives: ['@auto'] },
      ],
    },
  ],
  apis: [
    { name: 'getUser', params: [{ name: 'id', type: 'Int' }], returnType: 'User', module: 'user' },
    { name: 'listUsers', params: [], returnType: '[User]', module: 'user' },
    { name: 'createUser', params: [{ name: 'name', type: 'String' }, { name: 'email', type: 'String' }], returnType: 'User', module: 'user' },
    { name: 'getPost', params: [{ name: 'id', type: 'Int' }], returnType: 'Post', module: 'post' },
    { name: 'listPosts', params: [], returnType: '[Post]', module: 'post' },
  ],
  enums: [
    { name: 'Role', values: ['USER', 'ADMIN', 'MANAGER'] },
    { name: 'PostStatus', values: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
  ],
}

type SchemaItem = { kind: 'model'; name: string } | { kind: 'api'; name: string } | { kind: 'enum'; name: string }

const typeIcons: Record<string, typeof Hash> = {
  Int: Hash,
  Float: Hash,
  String: Type,
  Boolean: ToggleLeft,
  DateTime: Calendar,
  Duration: Clock,
}

function getTypeIcon(type: string) {
  if (type.startsWith('[')) return List
  const Icon = typeIcons[type]
  return Icon || Box
}

export function SchemaBrowser() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<SchemaItem>({ kind: 'model', name: 'User' })

  const filteredModels = mockSchema.models.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  )
  const filteredAPIs = mockSchema.apis.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  )
  const filteredEnums = mockSchema.enums.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  )

  const selectedModel = selected.kind === 'model'
    ? mockSchema.models.find((m) => m.name === selected.name)
    : null
  const selectedAPI = selected.kind === 'api'
    ? mockSchema.apis.find((a) => a.name === selected.name)
    : null
  const selectedEnum = selected.kind === 'enum'
    ? mockSchema.enums.find((e) => e.name === selected.name)
    : null

  return (
    <div className="flex h-[calc(100vh-7.5rem)] gap-4">
      {/* Left panel: tree */}
      <Card className="flex w-72 shrink-0 flex-col overflow-hidden p-0">
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search schema..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {/* Models */}
          <div className="mb-3">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Models
            </p>
            {filteredModels.map((m) => (
              <button
                key={m.name}
                onClick={() => setSelected({ kind: 'model', name: m.name })}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors cursor-pointer',
                  selected.kind === 'model' && selected.name === m.name
                    ? 'bg-accent-muted text-accent'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text',
                )}
              >
                <Database className="h-3.5 w-3.5 shrink-0" />
                {m.name}
                <span className="ml-auto text-text-muted">{m.fields.length}</span>
              </button>
            ))}
          </div>

          {/* APIs */}
          <div className="mb-3">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              APIs
            </p>
            {filteredAPIs.map((a) => (
              <button
                key={a.name}
                onClick={() => setSelected({ kind: 'api', name: a.name })}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors cursor-pointer',
                  selected.kind === 'api' && selected.name === a.name
                    ? 'bg-accent-muted text-accent'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text',
                )}
              >
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                {a.name}
              </button>
            ))}
          </div>

          {/* Enums */}
          <div>
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Enums
            </p>
            {filteredEnums.map((e) => (
              <button
                key={e.name}
                onClick={() => setSelected({ kind: 'enum', name: e.name })}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors cursor-pointer',
                  selected.kind === 'enum' && selected.name === e.name
                    ? 'bg-accent-muted text-accent'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text',
                )}
              >
                <List className="h-3.5 w-3.5 shrink-0" />
                {e.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Right panel: detail */}
      <Card className="flex-1 overflow-y-auto">
        {selectedModel && (
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted">
                <Database className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-text">{selectedModel.name}</h2>
                <p className="text-xs text-text-muted">{selectedModel.fields.length} fields</p>
              </div>
            </div>

            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-2">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted">Field</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted">Type</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted">Directives</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedModel.fields.map((f) => {
                    const Icon = getTypeIcon(f.type)
                    return (
                      <tr key={f.name} className="border-b border-border-subtle last:border-0">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5 text-text-muted" />
                            <span className="font-mono text-xs text-text">{f.name}</span>
                            {f.nullable && <span className="text-text-muted">?</span>}
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs text-accent">{f.type}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            {f.directives.map((d) => (
                              <Badge key={d} variant="outline" className="text-[10px]">
                                {d}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedAPI && (
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-muted">
                <ChevronRight className="h-4 w-4 text-success" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-text">{selectedAPI.name}</h2>
                <p className="text-xs text-text-muted">module: {selectedAPI.module}</p>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-border bg-surface-2 p-4">
              <p className="mb-2 text-xs text-text-muted">Signature</p>
              <code className="text-sm text-text">
                <span className="text-accent">api</span>{' '}
                <span className="text-text">{selectedAPI.name}</span>
                <span className="text-text-muted">(</span>
                {selectedAPI.params.map((p, i) => (
                  <span key={p.name}>
                    {i > 0 && <span className="text-text-muted">, </span>}
                    <span className="text-warning">{p.name}</span>
                    <span className="text-text-muted">: </span>
                    <span className="text-accent">{p.type}</span>
                  </span>
                ))}
                <span className="text-text-muted">): </span>
                <span className="text-accent">{selectedAPI.returnType}</span>
              </code>
            </div>

            {selectedAPI.params.length > 0 && (
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-2">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted">Parameter</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-text-muted">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAPI.params.map((p) => (
                      <tr key={p.name} className="border-b border-border-subtle last:border-0">
                        <td className="px-4 py-2.5 font-mono text-xs text-text">{p.name}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-accent">{p.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {selectedEnum && (
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-muted">
                <List className="h-4 w-4 text-warning" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-text">{selectedEnum.name}</h2>
                <p className="text-xs text-text-muted">{selectedEnum.values.length} values</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedEnum.values.map((v) => (
                <Badge key={v} variant="outline" className="font-mono">
                  {v}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
