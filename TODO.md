# Phase 5 — Connect Everything to Real Data (No Mock Data)

## Steps
- [ ] Inspect and map all mock-data usages (confirmed: `lib/mock-data.ts`, `app/models/[id]/page.tsx`, `app/marketplace/page.tsx`, `app/explore/page.tsx`).
- [ ] Rewrite `app/models/[id]/page.tsx` to fetch model + reviews from `GET /api/models/:id` and call `POST /api/inference` for playground (no simulation).
- [ ] Rewrite `app/marketplace/page.tsx` to fetch models from `GET /api/models` (pagination/filter/sort) and remove all `mockModels` usage.
- [ ] Rewrite `app/explore/page.tsx` to fetch models from `GET /api/models` and remove hardcoded `const models=[...]`.
- [ ] Verify no remaining imports/references to `@/lib/mock-data`.
- [ ] Delete `/lib/mock-data.ts`.
- [ ] Run `pnpm lint` and `pnpm test` (if present) and fix any build errors.
- [ ] Final wiring verification.

