# Getting Started Guide

Welcome to NexusAI! This guide will help you get the project up and running locally.

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** or npm
- **Git**
- **PostgreSQL** 14+ (for local development)
- **Git** for version control

### Install pnpm (Recommended)
```bash
npm install -g pnpm
```

---

## 🚀 Quick Start (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/nexus-ai-marketplace.git
cd nexus-ai-marketplace
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```bash
# Minimal setup for local development
DATABASE_URL=postgresql://localhost:5432/nexus_ai_dev
JWT_SECRET=your_secret_key_here
NEXT_PUBLIC_WAGMI_PROJECT_ID=your_wallet_connect_id
```

### 4. Start Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000` 🎉

---

## 🗄️ Database Setup

### PostgreSQL Installation

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
- Download from [postgresql.org](https://www.postgresql.org/download/)
- Run installer & follow prompts
- Start PostgreSQL service

**Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### Create Database
```bash
createdb nexus_ai_dev
```

### Run Migrations
```bash
pnpm db:migrate
```

---

## 🔧 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run production build locally
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format

# Run tests
pnpm test

# Test watch mode
pnpm test:watch

# Seed database with sample data
pnpm db:seed

# Deploy smart contracts (testnet)
pnpm contracts:deploy
```

---

## 🌐 Environment Variables

### Required for Local Development

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nexus_ai_dev

# Authentication
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRATION=7d

# Web3
NEXT_PUBLIC_WAGMI_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_api_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_GOVERNANCE=true
NEXT_PUBLIC_ENABLE_MARKETPLACE=true
```

### Optional (For Full Features)

```env
# Stripe (payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Pinata (IPFS storage)
PINATA_API_KEY=your_key
PINATA_API_SECRET=your_secret

# Analytics
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_MIXPANEL_TOKEN=your_token

# Smart Contracts
NEXT_PUBLIC_AI_MODEL_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_PAYMENT_MANAGER_ADDRESS=0x...
```

---

## 🔐 Authentication Setup

### MetaMask/Wallet Connection

1. Install MetaMask browser extension
2. Create test wallet
3. Get WalletConnect Project ID from [walletconnect.com](https://cloud.walletconnect.com)
4. Add to `.env.local`:
```env
NEXT_PUBLIC_WAGMI_PROJECT_ID=your_project_id
```

### Email Authentication

Already configured! Test with:
- Email: `test@example.com`
- Password: `Test@1234`

---

## 📚 Project Structure

```
nexus-ai-marketplace/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── api/                     # API routes
│   ├── auth/                    # Auth pages (login, signup)
│   ├── dashboard/               # User dashboard
│   ├── creator/                 # Creator dashboard
│   ├── admin/                   # Admin dashboard
│   └── marketplace/             # Marketplace pages
├── components/                   # Reusable React components
│   ├── ui/                      # Basic UI components
│   ├── landing/                 # Landing page sections
│   └── dashboard/               # Dashboard components
├── lib/                         # Utilities & helpers
│   ├── types.ts                 # TypeScript types
│   ├── api-client.ts            # API utilities
│   ├── web3-utils.ts            # Web3 utilities
│   └── database.ts              # Database utilities
├── netlify/functions/           # Serverless functions
├── contracts/                   # Smart contracts
├── public/                      # Static assets
├── styles/                      # Global styles
└── hooks/                       # Custom React hooks
```

---

## 🧪 Testing

### Run All Tests
```bash
pnpm test
```

### Run Specific Test
```bash
pnpm test models.test.ts
```

### Coverage Report
```bash
pnpm test --coverage
```

### Write Tests
Create files matching `*.test.ts` or `*.spec.ts`:
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

---

## 🔍 Debugging

### VS Code Debug Config

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "protocol": "inspector",
      "console": "integratedTerminal"
    }
  ]
}
```

### Browser DevTools
- Open DevTools (F12)
- React DevTools extension recommended
- Network tab to monitor API calls

---

## 🚨 Troubleshooting

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

### Issue: Module Not Found Error

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next pnpm-lock.yaml
pnpm install
```

### Issue: Database Connection Error

**Solution:**
```bash
# Check PostgreSQL is running
psql postgres

# Verify DATABASE_URL format
# postgresql://user:password@host:port/database

# Test connection
psql $DATABASE_URL
```

### Issue: TypeScript Errors

**Solution:**
```bash
# Type check
pnpm type-check

# Rebuild
pnpm build

# Clear cache
rm -rf .next
```

---

## 📦 Deployment Preparation

### Before Deploying

1. **Setup Production Database**
   ```bash
   # Use Heroku, AWS RDS, or similar
   # Update DATABASE_URL in environment
   ```

2. **Configure Secrets**
   ```bash
   # Add to Netlify environment variables
   # All .env.local variables except public ones
   ```

3. **Deploy Smart Contracts**
   ```bash
   cd contracts
   npx hardhat deploy --network sepolia
   # Save contract addresses to .env
   ```

4. **Test Stripe Webhook**
   ```bash
   # Use Stripe CLI
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

5. **Run Production Build**
   ```bash
   pnpm build
   pnpm start
   ```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

Or connect GitHub repository in Netlify dashboard for auto-deployment.

---

## 📖 Next Steps

1. **Read Documentation**
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Project structure
   - [API.md](API.md) - API documentation
   - [SECURITY.md](SECURITY.md) - Security guide

2. **Explore Code**
   - Check `app/page.tsx` for landing page
   - Review `components/landing/` for sections
   - Study `app/api/` for endpoints

3. **Start Development**
   - Create feature branches
   - Follow commit conventions
   - Test thoroughly before PR

4. **Get Help**
   - Check [CONTRIBUTING.md](CONTRIBUTING.md)
   - Open GitHub issues
   - Ask in discussions

---

## 🎯 Common Tasks

### Add New Page

1. Create directory under `app/`
2. Add `page.tsx` file
3. Use 'use client' for client components
4. Import layout if needed

### Add API Endpoint

1. Create file under `app/api/`
2. Export handler: `POST`, `GET`, etc.
3. Handle errors & validation
4. Return JSON response

### Add Component

1. Create file under `components/`
2. Export React component
3. Add TypeScript types
4. Use Tailwind for styling

### Style Elements

Use Tailwind CSS classes:
```tsx
<div className="p-4 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors">
  Content
</div>
```

---

## 🔗 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Wagmi Documentation](https://wagmi.sh)
- [Ethereum Docs](https://ethereum.org/en/developers)
- [Solidity Docs](https://docs.soliditylang.org)

---

## 💬 Community & Support

- GitHub Issues: Report bugs
- Discussions: Ask questions
- Email: dev@nexusai.com
- Discord: [Join community]

---

## 📝 License

MIT License - See [LICENSE](LICENSE)

---

Happy coding! 🚀

Built with ❤️ for the future of decentralized AI
