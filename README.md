# Luxo Studio

API Playground, Schema Browser, and Real-time Monitoring for Luxo services — built with Luxo.

## Features

- **API Playground** — construct requests, select fields, see responses with trace breakdown
- **Schema Browser** — visualize models, fields, APIs, events from introspection
- **Service Topology** — graph view of Gateway → Service latency and RPM
- **Distributed Tracing** — per-request trace with SQL, RPC, DataLoader timing
- **Metrics Dashboard** — QPS, P95 latency, error rate time series
- **Cluster Management** — monitor Gateway and Service node status, memory, CPU
- **Team & Multi-project** — team accounts with role-based access across multiple Luxo projects

## Architecture

```
Target Luxo Service              Luxo Studio
┌──────────────┐               ┌──────────────────┐
│ Luvia Gateway │──metrics───→ │ Backend (.luxo)   │
│   handlers    │  traces      │  ├── auth module  │
│   @stream     │              │  ├── project mgmt │
│               │←─playground─ │  ├── monitoring   │
│ /luvia?$schema│──introspect→ │  └── playground   │
└──────────────┘               │                    │
                               │ Frontend (React)   │
                               │  ├── @luxo/client  │
                               │  ├── @luxo/react   │
                               │  └── @luxo/vite    │
                               └──────────────────┘
```

## Tech Stack

- **Backend**: Luxo (.luxo schema → Go, PostgreSQL)
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **SDK**: @luxo/client + @luxo/react + @luxo/vite-plugin (dogfooding)
- **Charts**: Recharts
- **Icons**: Lucide React

## Development

```bash
# Backend
cp .env.example .env
luxo gen
luxo run

# Frontend
cd web
pnpm install
pnpm dev
```

## License

Apache-2.0
