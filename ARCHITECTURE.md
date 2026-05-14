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
