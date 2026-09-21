# MediMemory

MediMemory turns fictional discharge instructions into a source-traceable care memory for patients and caregivers.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/medimemory/src/App.tsx` — complete mobile-first demo flow and local care-memory interactions.
- `artifacts/medimemory/src/index.css` — MediMemory visual language, responsive styling, and motion.
- `screenshots/` — captured mobile previews from the finished build.

## Architecture decisions

- The first build is frontend-only and uses deterministic fictional data so the hackathon demo remains reliable without AI, camera, microphone, login, or database setup.
- Every retrieved answer routes to the fictional discharge source view; patient/caregiver notes are stored separately and labeled as unverified.
- Camera and voice interactions are progressive enhancements with explicit local demo fallbacks.

## Product

- Landing, scan/capture, processing, home dashboard, timeline, Ask MediMemory, source highlighting, caregiver view, Office Kit companion, demo reset, and final pitch screen.
- The demo story is optimized for Scan → Care Memory → Ask → Show Source.

## User preferences

None recorded.

## Gotchas

- The Vite build requires workflow-provided `PORT` and `BASE_PATH`; use the managed `artifacts/medimemory: web` workflow for the preview.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
