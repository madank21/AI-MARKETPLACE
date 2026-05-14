# Deployment Guide

## Prerequisites

- Netlify account (free or paid)
- GitHub account
- Environment variables configured
- PostgreSQL database (Heroku, AWS RDS, or managed service)

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Ensure all code is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Netlify Account

Visit [netlify.com](https://netlify.com) and sign up for a free account.

### 3. Connect GitHub Repository

1. Go to Netlify Dashboard
2. Click "New site from Git"
3. Select "GitHub" as your provider
4. Authorize Netlify to access your repositories
5. Select your repository

### 4. Configure Build Settings

Netlify should auto-detect your Next.js configuration:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: `netlify/functions`

### 5. Set Environment Variables

In Netlify Dashboard:

1. Go to Site Settings → Build & Deploy → Environment
2. Add all variables from `.env.local`:

```
NEXT_PUBLIC_ALCHEMY_ID=your_value
NEXT_PUBLIC_WAGMI_PROJECT_ID=your_value
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
# ... add all other variables
```

### 6. Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Your site is live!

### 7. Custom Domain

1. Go to Domain Settings
2. Click "Add custom domain"
3. Configure DNS records with your domain provider
4. Enable HTTPS (auto with Let's Encrypt)

### 8. Database Setup

For PostgreSQL on Heroku:

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev -a your-app-name

# Get connection string
heroku config -a your-app-name | grep DATABASE_URL

# Set in Netlify environment
# NEXT_PUBLIC_DATABASE_URL=postgres://...
```

### 9. Smart Contract Deployment

```bash
cd contracts

# Create .env file for hardhat
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_key

# Deploy to Sepolia testnet
npx hardhat deploy --network sepolia

# Deploy to Ethereum mainnet (⚠️ be careful!)
npx hardhat deploy --network mainnet
```

Save contract addresses and update `.env`:
```
NEXT_PUBLIC_AI_MODEL_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_PAYMENT_MANAGER_ADDRESS=0x...
```

## Monitoring & Maintenance

### Sentry Error Tracking

1. Create account at [sentry.io](https://sentry.io)
2. Create new project for Next.js
3. Add DSN to environment variables
4. Errors will be tracked automatically

### Analytics

For Mixpanel:
1. Create project at [mixpanel.com](https://mixpanel.com)
2. Get Project Token
3. Add to `NEXT_PUBLIC_MIXPANEL_TOKEN`

### Automated Deployments

Netlify auto-deploys on:
- Push to `main` branch
- Pull request merge

## Troubleshooting

### Build Fails

Check Netlify Deploy Logs:
1. Site Settings → Deploys
2. Click failed deployment
3. Check build logs

Common issues:
- Missing environment variables
- Node version mismatch
- Dependency conflicts

### Database Connection Issues

```bash
# Test connection locally
psql $DATABASE_URL -c "SELECT 1"

# Run migrations
pnpm run db:migrate
```

### Function Errors

Check Netlify Function Logs:
1. Functions tab in dashboard
2. Look for error messages
3. Check local testing with: `netlify functions:serve`

## Performance Optimization

1. **Enable Caching**
   - Set Cache-Control headers
   - Use Image Optimization
   
2. **Database**
   - Add indexes to frequently queried columns
   - Monitor query performance
   
3. **CDN**
   - Netlify Edge Functions for geolocation
   - Static asset optimization

## Security Checklist

- [ ] All secrets in environment variables (not code)
- [ ] Database password rotated
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Sentry monitoring active
- [ ] Regular backups configured
- [ ] API keys rotated monthly

## Rollback

To rollback to previous deployment:

1. Netlify Dashboard → Deploys
2. Find previous successful deploy
3. Click "Publish Deploy"

Or revert Git commit and push:
```bash
git revert HEAD
git push origin main
```

## Cost Estimation

Monthly costs approximately:
- Netlify: $0-19 (free tier usually sufficient)
- PostgreSQL: $7-300+ (Heroku hobby = $7)
- Domain: $12-15/year
- Stripe: 2.9% + $0.30 per transaction
- Storage (Pinata): $25-100 (pay-as-you-go)

Total: ~$50-400/month depending on traffic

## Support

- Netlify Docs: https://docs.netlify.com
- Next.js Deployment: https://nextjs.org/docs/deployment
- Community: Discord, GitHub Issues
