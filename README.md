# NexusAI — Decentralized AI Marketplace

A futuristic, production-grade decentralized AI marketplace built with **Next.js**, **Web3**, **Solidity smart contracts**, and **Stripe/crypto payments**. The platform lets users browse and buy AI models; creators upload and monetize models; and admins moderate and monitor the ecosystem.

---

## What is NexusAI?

NexusAI is a marketplace where AI model providers (creators) publish models and users purchase access. Under the hood, the system combines:

- **A web app** for discovery, purchasing, and running inference
- **Serverless APIs** for secure operations (auth, uploads, inference runner, payments)
- **Smart contracts** for registry, payments/subscriptions, reputation, and token primitives
- **A relational database (PostgreSQL)** for application state, users, catalog, and audit trails

For system-level details, see **[`ARCHITECTURE.md`](ARCHITECTURE.md)**.

---

## Key user journeys

### Users (browse → purchase → access)
1. Browse the marketplace (search/filter, model cards, categories)
2. Purchase access via **Stripe** (and design-ready crypto/subscription flows)
3. Access models from the user dashboard and run inference

### Creators (upload → manage → earn)
1. Upload model artifacts via the creator dashboard
2. Manage model metadata/versions (and operational settings)
3. Track earnings and usage metrics

### Admins (moderate → audit → govern)
1. Moderate models and review flagged content
2. Manage users and view platform analytics
3. Approve/reject items and monitor suspicious activity

---

## High-level architecture

The system is split into these layers:

1. **Frontend (Next.js App Router)**
   - `app/` contains route groups for public pages and role-specific dashboards
   - `components/` contains reusable UI building blocks (landing, marketplace UI, dashboard UI)

2. **Application API (Next.js API routes)**
   - `app/api/**` provides core REST endpoints for auth, models, inference, and payments

3. **Serverless backend (Netlify Functions)**
   - `netlify/functions/**` performs sensitive workflows (JWT verification, inference runner, uploads, Stripe webhook handlers, etc.)

4. **Smart contracts (Solidity)**
   - `contracts/AIModelRegistry.sol` — model registry/discovery + creator permissions
   - `contracts/PaymentManager.sol` — payments/subscriptions and creator earnings logic
   - `contracts/ReputationSystem.sol` — reviews/ratings + reputation scoring
   - `contracts/MarketplaceToken.sol` — token/staking primitives (NEXUS ERC-20)

5. **Data layer (PostgreSQL)**
   - `lib/database.ts` and `lib/types.ts` provide DB utilities and strongly-typed models

---

## Tech stack

- **Frontend**: Next.js (App Router), React 18, TypeScript
- **UI**: Tailwind CSS, Framer Motion
- **Web3**: wagmi, Ethers.js, RainbowKit
- **Backend**:
  - Next.js API routes (`app/api/**`)
  - Netlify Functions (`netlify/functions/**`)
- **Storage**: IPFS (Pinata-ready integration)
- **Payments**: Stripe (Payment Intents + webhooks)
- **Smart contracts**: Solidity + Hardhat

---

## Documentation map

This repo is documented as a set of focused markdown files:

- **Overview & architecture**: [`ARCHITECTURE.md`](ARCHITECTURE.md)
- **API reference**: [`API.md`](API.md)
- **Setup & local development**: [`GETTING_STARTED.md`](GETTING_STARTED.md)
- **Deployment**: [`DEPLOYMENT.md`](DEPLOYMENT.md)
- **Security**: [`SECURITY.md`](SECURITY.md)
- **Contributing**: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- **Testing/verification**: [`TESTING_VERIFICATION.md`](TESTING_VERIFICATION.md)

---

## Project structure

Primary directories:

- `app/`
  - `app/api/` — Next.js route handlers
  - `app/auth/` — login/signup pages
  - `app/marketplace/` — marketplace pages
  - `app/models/` — model detail pages
  - `app/dashboard/` — user dashboard
  - `app/creator/` — creator dashboard (upload, earnings, etc.)
  - `app/admin/` — admin dashboard

- `components/`
  - `components/ui/` — reusable UI components
  - `components/landing/` — landing page sections
  - `components/dashboard/` — dashboard UI building blocks

- `lib/`
  - `api-client.ts` — typed API client utilities
  - `database.ts` — DB connection helpers
  - `types.ts` — shared application types
  - `web3-utils.ts` — Web3/blockchain helpers

- `netlify/functions/`
  - `authenticate.ts`, `verify-token.ts` — auth helpers
  - `run-inference.ts` — inference execution
  - `upload-model.ts` — model upload to IPFS
  - `create-payment.ts` — Stripe payment creation
  - `stripe-webhook.ts` — Stripe webhook processing

- `contracts/`
  - Solidity contracts for registry, payments, reputation, and token primitives

- `public/` and `styles/`
  - static assets and global/marketplace styling

---

## Core APIs (quick guide)

For complete endpoint reference (request/response examples), see **[`API.md`](API.md)**.

High-level endpoints include:

- **Authentication**
  - `POST /api/auth/login`
  - `POST /api/auth/signup`
  - `GET /api/auth/refresh`

- **Models**
  - `GET /api/models`
  - `GET /api/models/[id]`
  - `POST /api/models` (creator)

- **Inference**
  - `POST /api/inference`
  - `POST /api/inference/batch`

- **Payments**
  - `POST /api/payments/create-intent`
  - `POST /api/webhooks/stripe`

---

## Getting started

See **[`GETTING_STARTED.md`](GETTING_STARTED.md)** for the full quickstart, env var list, and commands.

Typical flow:

1. Copy env vars: `cp .env.example .env.local`
2. Start PostgreSQL
3. Migrate database: `pnpm run db:migrate`
4. Run dev server: `pnpm dev`

---

## Deployment

See **[`DEPLOYMENT.md`](DEPLOYMENT.md)** for full Netlify instructions.

High-level:

1. Configure environment variables in Netlify
2. Deploy the Next.js app
3. Deploy smart contracts via Hardhat

---

## Security

Security hardening is documented in **[`SECURITY.md`](SECURITY.md)**. It includes:

- JWT auth with refresh flow and RBAC roles
- Wallet signing approach
- Rate limiting + input validation
- CORS/CSP/XSS protections
- Payment webhook verification

---

## Contributing

Contribution process is documented in **[`CONTRIBUTING.md`](CONTRIBUTING.md)**.

---

## License

MIT (see `LICENSE` in the repository).

---

Built with ❤️ for the future of decentralized AI

