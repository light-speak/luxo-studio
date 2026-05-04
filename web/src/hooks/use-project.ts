import { createContext, useContext, type ReactNode } from 'react'
import React from 'react'

interface Project {
  id: number
  name: string
  mode: 'EMBEDDED' | 'CLUSTER'
  teamId: number
}

interface ProjectContextValue {
  project: Project | null
  setProject: (p: Project | null) => void
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ project, setProject, children }: {
  project: Project | null
  setProject: (p: Project | null) => void
  children: ReactNode
}) {
  return React.createElement(ProjectContext.Provider, {
    value: { project, setProject },
  }, children)
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used within ProjectProvider')
  return ctx
}
