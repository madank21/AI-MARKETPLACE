# Quick Reference Guide

Fast lookup for common tasks and commands.

---

## ⚡ Command Quick Reference

### Development
```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Build for production
pnpm start        # Run production build
pnpm lint         # Lint code
pnpm type-check   # Check TypeScript
pnpm format       # Format code (Prettier)
pnpm test         # Run tests
```

### Database
```bash
pnpm db:migrate   # Run migrations
pnpm db:seed      # Seed sample data
pnpm db:reset     # Drop and recreate DB
pnpm db:backup    # Backup database
```

### Contracts
```bash
pnpm contracts:compile   # Compile Solidity
pnpm contracts:deploy    # Deploy to testnet
pnpm contracts:verify    # Verify on block explorer
```

### Deployment
```bash
pnpm build && pnpm start   # Test production build locally
netlify deploy --prod      # Deploy to Netlify
```

---

## 📁 File Structure Quick Reference

```
app/
├── page.tsx                # Landing page
├── layout.tsx              # Root layout
├── api/                    # API endpoints
│   ├── auth/              # Authentication
│   ├── models/            # Model management
│   ├── inference/         # AI inference
│   ├── payments/          # Payments
│   └── webhooks/          # Webhooks
├── auth/                   # Auth pages
├── dashboard/             # User dashboard
├── creator/               # Creator tools
├── admin/                 # Admin panel
└── marketplace/           # Marketplace

components/
├── ui/                    # Base UI components
├── landing/               # Landing page sections
└── dashboard/             # Dashboard components

lib/
├── types.ts               # TypeScript types
├── api-client.ts          # API helpers
├── web3-utils.ts          # Web3 utilities
├── database.ts            # DB utilities
└── mock-data.ts           # Sample data

contracts/
├── AIModelRegistry.sol
├── PaymentManager.sol
├── ReputationSystem.sol
└── MarketplaceToken.sol

netlify/functions/        # Serverless functions
```

---

## 🔧 Common Code Patterns

### Create API Endpoint
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

### Create Component with Animation
```typescript
'use client'

import { motion } from 'framer-motion'

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Content */}
    </motion.div>
  )
}
```

### Use Database
```typescript
import { getDatabase } from '@/lib/database'

const db = await getDatabase()
const users = await db.query('SELECT * FROM users')
```

### Fetch with Auth
```typescript
import { fetchWithAuth } from '@/lib/api-client'

const data = await fetchWithAuth('/api/models', {
  method: 'GET'
})
```

### Web3 Integration
```typescript
import { getContractInstance } from '@/lib/web3-utils'

const contract = await getContractInstance('AIModelRegistry')
const models = await contract.getModels()
```

---

## 🎨 Styling Quick Reference

### Tailwind Classes
```typescript
// Sizing
className="w-full h-screen p-4 m-2"

// Colors
className="bg-primary text-white border border-border"

// Hover effects
className="hover:bg-primary/80 transition-colors"

// Dark mode
className="dark:bg-slate-900 dark:text-white"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Animations
className="animate-pulse animate-spin"
```

### Custom Colors
```css
--primary: 218 91% 58%
--secondary: 281 89% 63%
--accent: 0 84% 60%
--background: 5 8% 10%
```

### Glassmorphism
```typescript
className="glass-card rounded-xl border border-border/50"
```

---

## 🔐 Environment Variables

### Required
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional but Recommended
```env
NEXT_PUBLIC_WAGMI_PROJECT_ID=
NEXT_PUBLIC_ALCHEMY_ID=
STRIPE_SECRET_KEY=
PINATA_API_KEY=
```

### Feature Flags
```env
NEXT_PUBLIC_ENABLE_MARKETPLACE=true
NEXT_PUBLIC_ENABLE_GOVERNANCE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## 🚀 Deployment

### Deploy to Netlify
```bash
# Via CLI
netlify deploy --prod

# Via GitHub
# 1. Push to main branch
# 2. Netlify auto-deploys (if configured)
```

### Deploy Contracts
```bash
cd contracts
npx hardhat deploy --network sepolia
```

### Environment Setup
1. Set all env vars in hosting platform
2. Run database migrations
3. Deploy contracts
4. Verify webhooks
5. Test production flows

---

## 🐛 Debugging Commands

### View Logs
```bash
# Dev server logs
pnpm dev

# Build logs
pnpm build 2>&1 | tee build.log

# Database query log
psql $DATABASE_URL -c "SELECT query FROM pg_stat_statements LIMIT 10;"
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* pnpm dev

# Debug specific module
DEBUG=models:* pnpm dev
```

### TypeScript Issues
```bash
# Find TS errors
pnpm type-check --pretty

# Check specific file
pnpm type-check path/to/file.ts
```

---

## 📊 Important API Endpoints

### Authentication
```
POST   /api/auth/login         Login with email
POST   /api/auth/signup        Register new user
POST   /api/auth/refresh       Refresh JWT token
```

### Models
```
GET    /api/models             List all models
GET    /api/models/[id]        Get model details
POST   /api/models             Create new model
PUT    /api/models/[id]        Update model
DELETE /api/models/[id]        Delete model
```

### Inference
```
POST   /api/inference          Run model inference
GET    /api/inference/history  Get inference history
```

### Payments
```
POST   /api/payments/create-intent    Create payment
GET    /api/payments/history          Payment history
```

### Webhooks
```
POST   /api/webhooks/stripe    Stripe webhook handler
```

---

## 🔑 JWT Handling

### Decode Token
```typescript
import jwt from 'jsonwebtoken'

const decoded = jwt.verify(token, process.env.JWT_SECRET)
console.log(decoded.userId)
```

### Create Token
```typescript
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: '7d' }
)
```

### Check in Middleware
```typescript
const token = request.headers.get('authorization')?.split(' ')[1]
if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
```

---

## 💾 Database Queries

### Common Queries
```sql
-- Get all models
SELECT * FROM models WHERE active = true;

-- User stats
SELECT COUNT(*) as total FROM users;

-- Revenue
SELECT SUM(amount) as total FROM payments WHERE status = 'completed';

-- Model downloads
SELECT model_id, COUNT(*) as downloads FROM downloads GROUP BY model_id;
```

---

## 🧪 Testing Patterns

### Component Test
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

test('button renders', () => {
  render(<Button>Click</Button>)
  expect(screen.getByText('Click')).toBeInTheDocument()
})
```

### API Route Test
```typescript
import { POST } from '@/app/api/example/route'

test('POST endpoint', async () => {
  const request = new Request('http://localhost:3000/api/example', {
    method: 'POST',
    body: JSON.stringify({ test: 'data' })
  })
  const response = await POST(request)
  expect(response.status).toBe(200)
})
```

---

## 🔒 Security Checklist

- [ ] All secrets in `.env.local`
- [ ] No console.log of sensitive data
- [ ] Input validation on all forms
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] SQL injection prevention
- [ ] XSS protection headers
- [ ] HTTPS enforced in production
- [ ] JWT verified on protected routes
- [ ] Admin endpoints require auth

---

## 📞 Quick Help

### Where to find...
- **Landing page**: `app/page.tsx`
- **Auth logic**: `app/api/auth/`
- **Dashboard**: `app/dashboard/`
- **UI components**: `components/ui/`
- **Types**: `lib/types.ts`
- **Styles**: `styles/globals.css`
- **Config**: `.env.example`, `next.config.mjs`
- **Smart contracts**: `contracts/`
- **Database**: `lib/database.ts`

### How to...
- **Add page**: Create file in `app/page-name/page.tsx`
- **Add endpoint**: Create file in `app/api/route-name/route.ts`
- **Add component**: Create in `components/name.tsx`
- **Add style**: Use Tailwind classes or `styles/global.css`
- **Add type**: Add to `lib/types.ts`
- **Add utility**: Add to `lib/utils.ts` or new file

---

## 🚨 Emergency Commands

```bash
# Hard reset everything
rm -rf node_modules .next pnpm-lock.yaml
pnpm install
pnpm db:reset
pnpm dev

# Kill stuck process
lsof -ti:3000 | xargs kill -9

# Check what changed
git status
git diff

# See recent commits
git log --oneline -10

# Revert last commit
git reset --soft HEAD~1
```

---

## 📚 Link Quick Access

- 📖 [Full Architecture](ARCHITECTURE.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 🔐 [Security Guide](SECURITY.md)
- 📡 [API Reference](API.md)
- 🤝 [Contributing](CONTRIBUTING.md)
- 🚀 [Getting Started](GETTING_STARTED.md)
- ✅ [Testing Guide](TESTING_VERIFICATION.md)

---

Remember: **When in doubt, check the documentation or run tests!**

Last updated: May 15, 2024
