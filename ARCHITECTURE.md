# NexusAI Architecture (Updated)

NexusAI is a decentralized AI marketplace that connects **creators** (publish and monetize models) with **users** (purchase access and run inference). The architecture combines:

- **Next.js (App Router)** for the UI
- **Netlify Functions + Next.js API Routes** for backend workflows
- **Solidity smart contracts** for registry, payments/subscriptions, reputation, and token primitives
- **PostgreSQL** for application state, accounting, catalog data, and audit logs
- **IPFS/Pinata** for model artifact storage

For product scope and API endpoint details, see:
- `README.md`
- `API.md`

---

## 1) System roles & responsibilities

### Users
- Browse the marketplace catalog
- Purchase access (Stripe-first; crypto/subscription flows supported by design)
- Run inference and view their purchased access

### Creators
- Upload model artifacts and metadata
- Manage model versions and operational settings
- Track earnings, downloads, usage, and rating/reputation signals

### Admins
- Moderate models/content and handle flagged items
- Manage users and view platform analytics
- Review and approve/reject creator submissions

---

## 2) High-level component diagram (logical)

1. **Browser / UI** (Next.js)
   - Pages and route groups under `app/` (landing, marketplace, auth, dashboards)
   - Shared UI components in `components/`

2. **App Server (Next.js API routes)**
   - Core authenticated REST endpoints under `app/api/**`

3. **Serverless workflows (Netlify Functions)**
   - Sensitive or heavy operations under `netlify/functions/**`

4. **Smart contracts (Solidity)**
   - `contracts/AIModelRegistry.sol`
   - `contracts/PaymentManager.sol`
   - `contracts/ReputationSystem.sol`
   - `contracts/MarketplaceToken.sol`

5. **Database (PostgreSQL)**
   - Shared DB connection and data layer under `lib/`

6. **Decentralized storage**
   - IPFS uploads via Pinata-ready integration

---

## 3) Codebase layout (what maps to what)

### Frontend (Next.js)
- `app/auth/*` — login/signup UI
- `app/marketplace/*` — catalog browsing UI
- `app/models/*` — model detail pages
- `app/dashboard/*` — user dashboard (purchased access, API keys, usage)
- `app/creator/*` — creator dashboard (upload, analytics, earnings)
- `app/admin/*` — admin moderation and analytics

### Shared UI
- `components/ui/*` — reusable UI primitives (buttons, cards, filters, tables, etc.)
- `components/landing/*` — landing page sections
- `components/dashboard/*` — dashboard layout and helpers
- `components/error-boundary.tsx` — runtime crash boundary

### Shared libraries
- `lib/api-client.ts` — typed client utilities
- `lib/database.ts` — DB connection + queries
- `lib/types.ts` — shared TypeScript types
- `lib/web3-utils.ts` and `lib/web3-utils.ts` — Web3 helpers (wallet/signing/contract interaction)

### Backend endpoints
- **Next.js API routes**: `app/api/**`
  - Auth routes (login/signup/refresh)
  - Models routes (list/get/creator ops)
  - Inference routes
  - Payments routes
- **Netlify Functions**: `netlify/functions/**`
  - `authenticate.ts`, `verify-token.ts` — JWT verification
  - `run-inference.ts` — inference execution runner
  - `upload-model.ts` — upload model artifacts to IPFS
  - `create-payment.ts` — Stripe payment creation
  - `stripe-webhook.ts` — Stripe webhook processor

### Contracts
- `contracts/*.sol` — on-chain primitives used for registry, payments, reputation, token/staking logic.

---

## 4) Backend flow details (where sensitive work happens)

### Authentication & authorization
- JWT bearer tokens protect API routes.
- Roles are enforced via RBAC (**User / Creator / Admin**).
- Refresh logic exists to maintain sessions.

### Wallet interactions
- Client uses `wagmi` + `RainbowKit` + `ethers` for wallet connection/signing.
- Server-side components avoid private key handling; operations rely on signed messages/verified credentials.

### Model publication & discovery
- Creator dashboard uploads artifacts → IPFS/Pinata.
- Metadata is stored/indexed (DB) and surfaced in marketplace UI.

### Inference
- Users call inference endpoints.
- Serverless runners execute inference and record usage for billing/analytics.

### Payments
- Stripe Payment Intents are created via payment endpoints/functions.
- Stripe webhooks verify payment status and trigger state updates.
- Crypto payment support is represented by design + contract integration points.

---

## 5) Smart contracts (what each contract is for)

### `AIModelRegistry.sol`
- Model registry/discovery
- Creator permissions
- Model activation/deactivation and metadata references

### `PaymentManager.sol`
- Payment/subscription state
- Creator earnings distribution logic
- Platform fee management

### `ReputationSystem.sol`
- Reviews/ratings
- Reputation scoring for creators

### `MarketplaceToken.sol`
- ERC-20 token implementation (NEXUS)
- Staking/reward primitives (where supported by the contract design)

---

## 6) Storage & data

### IPFS / Pinata
- Model artifacts are stored in IPFS with Pinata integration support.

### PostgreSQL
- Stores user profiles, model metadata, transactions, subscriptions, reviews, usage logs, and audit logs.

---

## 7) Tech stack (current)

- **Frontend**: Next.js App Router, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Web3**: wagmi, Ethers.js, RainbowKit
- **Backend**: Next.js API Routes (`app/api/**`) + Netlify Functions (`netlify/functions/**`)
- **DB**: PostgreSQL
- **Payments**: Stripe (Payment Intents + webhook verification)
- **Storage**: IPFS/Pinata
- **Contracts**: Solidity + Hardhat

---

## 8) Security & compliance (architecture-level)

- JWT auth + refresh flow
- RBAC enforcement (User/Creator/Admin)
- Rate limiting and input validation
- Webhook signature verification (Stripe)
- XSS/CORS/CSP hardening

Full details are in `SECURITY.md`.

---

## 9) Next documentation steps

- For local setup: `GETTING_STARTED.md`
- For API endpoints: `API.md`
- For deployment: `DEPLOYMENT.md`
- For deeper implementation notes/completion: `IMPLEMENTATION_SUMMARY.md`

#  OLD ARCHITECT

# NexusAI - Decentralized AI Marketplace

A futuristic, production-grade decentralized AI marketplace platform built with Next.js, Web3, and blockchain technology.

## 🚀 Features

### Core Platform
- **AI Model Marketplace**: Browse, purchase, and deploy AI models
- **Creator Dashboard**: Upload, manage, and monetize your AI models
- **User Dashboard**: Access purchased models and manage subscriptions
- **Admin Dashboard**: Moderate content and manage platform

### Web3 Integration
- **Wallet Connection**: MetaMask, WalletConnect, and RainbowKit support
- **Smart Contracts**: Deploy and manage AI models on-chain
- **Blockchain Payments**: Direct crypto payments with Ethereum
- **Governance**: DAO-ready architecture for community voting

### AI & ML Features
- **Model Versioning**: Track model updates and rollbacks
- **Inference API**: Run predictions with usage tracking
- **Performance Monitoring**: Real-time analytics and metrics
- **IPFS Storage**: Decentralized model storage with Pinata

### Payments & Monetization
- **Stripe Integration**: Credit card payments
- **Crypto Payments**: Direct Ethereum transactions
- **Subscriptions**: Recurring billing for model access
- **Creator Earnings**: Transparent payment tracking

### Analytics & Monitoring
- **User Analytics**: Mixpanel/PostHog integration
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Real-time metrics
- **Audit Logs**: Complete action history

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Web3**: Wagmi, Ethers.js, RainbowKit
- **Backend**: Netlify Functions, Next.js API Routes
- **Database**: PostgreSQL
- **Payments**: Stripe
- **Storage**: IPFS/Pinata
- **Smart Contracts**: Solidity, Hardhat

## 📦 Installation

### Prerequisites
- Node.js 18+
- pnpm or npm
- PostgreSQL database
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nexus-ai-marketplace.git
cd nexus-ai-marketplace
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Database connection string
- API keys (Alchemy, Stripe, Pinata, etc.)
- Smart contract addresses
- RPC endpoints

4. **Set up database**
```bash
# Run migrations
pnpm run db:migrate

# Seed sample data
pnpm run db:seed
```

5. **Deploy smart contracts (optional)**
```bash
cd contracts
npx hardhat deploy --network sepolia
```

6. **Start development server**
```bash
pnpm dev
```

Visit `http://localhost:3000`

## 📖 Project Structure

```
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   ├── auth/                     # Authentication pages
│   ├── admin/                    # Admin dashboard
│   ├── creator/                  # Creator dashboard
│   ├── dashboard/                # User dashboard
│   ├── marketplace/              # Marketplace pages
│   └── models/                   # Model detail pages
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── dashboard/                # Dashboard components
│   └── landing/                  # Landing page sections
├── lib/                          # Utilities and helpers
│   ├── types.ts                  # TypeScript types
│   ├── api-client.ts             # API client utilities
│   ├── web3-utils.ts             # Web3 utilities
│   └── database.ts               # Database utilities
├── netlify/                      # Netlify functions
│   └── functions/                # Serverless functions
├── contracts/                    # Smart contracts
├── public/                       # Static assets
├── styles/                       # Global styles
└── hooks/                        # Custom React hooks
```

## 🚀 Deployment

### Deploy to Netlify

1. **Connect your GitHub repository**
   - Push to GitHub
   - Connect in Netlify dashboard

2. **Configure environment variables**
   - Add all `.env.local` variables to Netlify

3. **Deploy**
```bash
# Automatic deployment on push to main
# Or manual: pnpm run build && netlify deploy
```

### Deploy Smart Contracts

```bash
cd contracts
npx hardhat deploy --network mainnet
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/refresh` - Refresh JWT token

### Models
- `GET /api/models` - List all models
- `GET /api/models/[id]` - Get model details
- `POST /api/models` - Create new model (creator)

### Inference
- `POST /api/inference` - Run model inference
- `POST /api/inference/batch` - Batch inference

### Payments
- `POST /api/payments/create-intent` - Create Stripe intent
- `POST /api/webhooks/stripe` - Stripe webhook

## 🔐 Security

- JWT token authentication
- Ethereum wallet signing
- Rate limiting on API routes
- CORS protection
- SQL injection prevention
- XSS protection headers

## 📊 Database Schema

Key tables:
- `users` - User accounts
- `models` - AI models
- `transactions` - Payment transactions
- `subscriptions` - Active subscriptions
- `reviews` - Model reviews
- `usage_logs` - API usage tracking
- `audit_logs` - Platform audit trail

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

- [ ] Advanced AI recommendations
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] DAO governance voting
- [ ] Staking rewards system
- [ ] Mobile app
- [ ] Advanced analytics dashboard
- [ ] Plugin ecosystem
- [ ] Distributed inference network

## 💬 Support

- GitHub Issues: Report bugs
- Discussions: Ask questions
- Email: support@nexusai.example.com
- Discord: Join community server

## 👨‍💻 Authors

- Your Name (@github)

---

Built with ❤️ for the future of decentralized AI

