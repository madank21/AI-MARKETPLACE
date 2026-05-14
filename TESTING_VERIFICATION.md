# Testing & Verification Guide

This guide helps verify the implementation and identify any issues.

---

## 🔍 Pre-Deployment Verification Checklist

### 1. TypeScript Compilation

```bash
# Check for any TypeScript errors
pnpm type-check
```

**Expected Output:**
- No errors or warnings
- All types properly resolved
- No `any` types except where necessary

**If Errors Found:**
- Review error message carefully
- Check import paths
- Verify interface definitions
- Run `pnpm install` to update dependencies

### 2. Build Verification

```bash
# Attempt production build
pnpm build
```

**Expected Output:**
- ✓ Compiled successfully
- Route optimization results
- No warnings in critical code

**If Build Fails:**
- Clear `.next` directory: `rm -rf .next`
- Check for missing dependencies
- Verify all imports are correct
- Check for circular dependencies

### 3. Linting

```bash
# Run ESLint
pnpm lint
```

**Expected Output:**
- No errors
- Minor warnings acceptable
- Code style consistent

### 4. Unit Tests

```bash
# Run test suite
pnpm test
```

**Expected Output:**
- All tests pass (or add more tests)
- Coverage > 80% for critical files
- No skipped tests

---

## 🧪 Manual Testing

### Authentication Flow

**Email Login:**
1. Navigate to `http://localhost:3000/auth/login`
2. Click "Email" tab
3. Enter email: `test@example.com`
4. Enter password: `Test@1234`
5. Click "Sign In"
6. ✓ Should redirect to dashboard

**Wallet Connection:**
1. Navigate to `http://localhost:3000/auth/login`
2. Click "Connect Wallet" tab
3. Select MetaMask
4. Approve in MetaMask popup
5. ✓ Should show connected address
6. ✓ Should redirect after confirmation

### Navigation

Test all main routes:
```
✓ / (Landing page)
✓ /marketplace (Model marketplace)
✓ /auth/login (Login)
✓ /auth/signup (Signup)
✓ /dashboard (User dashboard)
✓ /creator (Creator dashboard)
✓ /admin (Admin dashboard)
```

### Responsive Design

Test on different screen sizes:
- **Mobile**: 375px width
- **Tablet**: 768px width
- **Desktop**: 1024px+ width

**Check:**
- ✓ All elements visible
- ✓ No horizontal scroll
- ✓ Buttons clickable
- ✓ Menus work correctly

---

## 🐛 Known Issues & Fixes

### Issue: Mock Data Not Loading

**Error:** Models not showing in marketplace

**Fix:**
1. Check if `lib/mock-data.ts` is imported correctly
2. Verify mock data structure matches types
3. Ensure component has `'use client'` directive if using hooks

### Issue: Database Connection Failed

**Error:** `Error: Client was not initialized`

**Fix:**
```bash
# 1. Verify PostgreSQL is running
psql postgres

# 2. Check DATABASE_URL
echo $DATABASE_URL

# 3. Test connection
psql $DATABASE_URL -c "SELECT 1"

# 4. Run migrations
pnpm db:migrate
```

### Issue: Wallet Connection Fails

**Error:** `WalletConnectConnector not found`

**Fix:**
1. Install MetaMask extension
2. Create test wallet
3. Get WalletConnect Project ID
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_WAGMI_PROJECT_ID=your_id
   ```
5. Restart dev server

### Issue: Animations Not Working

**Error:** Elements don't animate on load

**Fix:**
1. Check if Framer Motion is imported
2. Verify `'use client'` directive present
3. Check browser DevTools for JS errors
4. Clear cache: `rm -rf .next`

---

## 🔧 Common Fixes

### Clear All Caches
```bash
# Remove all build artifacts
rm -rf node_modules .next pnpm-lock.yaml

# Reinstall
pnpm install

# Rebuild
pnpm build
```

### Reset Database
```bash
# Drop database
dropdb nexus_ai_dev

# Recreate
createdb nexus_ai_dev

# Run migrations
pnpm db:migrate

# Seed data
pnpm db:seed
```

### Fix Import Paths
All imports should use `@/` alias:
```typescript
// ✓ Correct
import { Button } from '@/components/ui/button'

// ✗ Wrong
import { Button } from '../components/ui/button'
```

### Fix TypeScript Errors
```bash
# Generate types
pnpm type-check

# View detailed errors
pnpm type-check --pretty
```

---

## 📊 Performance Testing

### Lighthouse Audit

In Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. **Target scores:**
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 95
   - SEO: > 90

### Bundle Analysis

```bash
# Analyze bundle size
ANALYZE=true pnpm build
```

**Target:**
- Initial bundle < 200KB
- CSS < 50KB
- JS < 150KB

### API Performance

```bash
# Monitor API calls in DevTools
# Network tab > XHR/Fetch

# Check timing:
# - Time to First Byte (TTFB) < 200ms
# - Full request < 1s
```

---

## 🔐 Security Verification

### Check for Secrets

```bash
# Scan for exposed secrets
git log --all -S "password\|secret\|key" --oneline

# Scan files
grep -r "password\|secret" . --include="*.ts" --include="*.tsx"
```

**All secrets should be:**
- ✓ In `.env.local` (git ignored)
- ✓ Never in code
- ✓ Different per environment
- ✓ Rotated regularly

### Verify HTTPS Headers

Check in browser DevTools > Network > Headers:
```
✓ X-Content-Type-Options: nosniff
✓ X-Frame-Options: DENY
✓ X-XSS-Protection: 1; mode=block
✓ Referrer-Policy: strict-origin-when-cross-origin
```

### Test Authentication

1. Login successfully
2. Check JWT token in localStorage
3. Try accessing admin page
4. ✓ Should redirect if not authorized

---

## 📝 Test Coverage

Run coverage report:
```bash
pnpm test --coverage
```

**Target Coverage:**
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

---

## 🚀 Pre-Launch Checklist

Before going live:

### Code Quality
- [ ] All TypeScript compiles without errors
- [ ] ESLint passes with no critical warnings
- [ ] All tests pass
- [ ] Code coverage > 80%
- [ ] No console errors

### Performance
- [ ] Lighthouse score > 90 on all metrics
- [ ] Bundle size optimized
- [ ] Database queries optimized
- [ ] API response time < 1s
- [ ] No memory leaks

### Security
- [ ] All secrets in environment variables
- [ ] No hardcoded credentials
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Input validation in place
- [ ] SQL injection prevention verified

### Functionality
- [ ] All user flows tested
- [ ] Authentication works
- [ ] Payment flow tested
- [ ] Admin features verified
- [ ] Creator tools working
- [ ] Marketplace operational

### Browser Compatibility
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Mobile browsers tested

### Database
- [ ] Migrations run successfully
- [ ] Backup strategy in place
- [ ] Connection pooling configured
- [ ] Query performance good
- [ ] Indexes optimized

### Deployment
- [ ] Environment variables set
- [ ] Database URL configured
- [ ] Build completes successfully
- [ ] Start command works
- [ ] Health check endpoint works

### Monitoring
- [ ] Error tracking enabled (Sentry)
- [ ] Analytics configured
- [ ] Logs aggregated
- [ ] Alerts configured
- [ ] Metrics dashboard set up

---

## 📞 Getting Help

### Debug Mode

Enable verbose logging:
```bash
DEBUG=* pnpm dev
```

### Check Logs

```bash
# Next.js logs
tail -f .next/logs/build.log

# Database logs
psql -l # List databases
psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements LIMIT 10;"
```

### Browser Console

Open DevTools (F12) and check:
- ✓ No red errors
- ✓ No CORS warnings
- ✓ No unhandled promise rejections

### Network Inspector

Monitor API calls:
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR/Fetch
4. Check:
   - Request headers
   - Response status (200, 401, 500, etc)
   - Response body
   - Timing

---

## ✅ Final Verification

Run complete verification:
```bash
#!/bin/bash

echo "🔍 Running verification..."

# 1. TypeScript check
echo "✓ Type checking..."
pnpm type-check || exit 1

# 2. Lint check
echo "✓ Linting..."
pnpm lint || exit 1

# 3. Build check
echo "✓ Building..."
pnpm build || exit 1

# 4. Test check
echo "✓ Testing..."
pnpm test || exit 1

echo "✅ All checks passed!"
```

Save as `verify.sh` and run:
```bash
chmod +x verify.sh
./verify.sh
```

---

## 📚 Additional Resources

- [Next.js Debugging](https://nextjs.org/docs/advanced-features/debugging)
- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)
- [React DevTools](https://react-devtools-tutorial.vercel.app/)
- [TypeScript Troubleshooting](https://www.typescriptlang.org/docs/handbook/troubleshooting.html)

---

If issues persist, check:
1. [ARCHITECTURE.md](ARCHITECTURE.md)
2. [DEPLOYMENT.md](DEPLOYMENT.md)
3. [SECURITY.md](SECURITY.md)
4. GitHub issues
5. Project documentation

Built with ❤️ for reliability and quality
