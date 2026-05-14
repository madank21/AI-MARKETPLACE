# Contributing Guide

Thank you for your interest in contributing to NexusAI! We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature
4. Make your changes
5. Push to your fork
6. Create a pull request

## Development Setup

```bash
# Install dependencies
pnpm install

# Create .env.local from .env.example
cp .env.example .env.local

# Start development server
pnpm dev

# Run tests
pnpm test

# Check types
pnpm type-check
```

## Code Style

We use:
- **Prettier** for formatting
- **ESLint** for linting
- **TypeScript** for type safety

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm type-check
```

## Commit Convention

Use conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: refactor code
test: add tests
chore: maintenance tasks
```

Example:
```bash
git commit -m "feat: add marketplace search filters"
```

## Pull Request Process

1. Update documentation if needed
2. Add/update tests for your changes
3. Ensure all tests pass: `pnpm test`
4. Ensure no linting errors: `pnpm lint`
5. Update CHANGELOG.md
6. Provide clear PR description

## Issue Guidelines

- Search existing issues first
- Provide clear reproduction steps for bugs
- Include screenshots for UI issues
- Be respectful and constructive

## Code Guidelines

### React Components

```typescript
'use client' // Add for client components

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
}

export function MyComponent({ children, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### TypeScript

- Use explicit types
- Avoid `any` type
- Define interfaces for data structures
- Use utility types appropriately

### Web3 Code

```typescript
// Always handle errors
try {
  const tx = await contract.method()
  await tx.wait()
} catch (error) {
  console.error('Contract call failed:', error)
}

// Validate addresses
if (!isValidEthereumAddress(address)) {
  throw new Error('Invalid address')
}
```

## Testing

```bash
# Run all tests
pnpm test

# Run specific test
pnpm test models.test.ts

# Run with coverage
pnpm test --coverage

# Watch mode
pnpm test:watch
```

Write tests for:
- New features
- Bug fixes
- Edge cases
- Error handling

## Documentation

Update documentation for:
- New features
- API changes
- Configuration options
- Breaking changes

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. GitHub Actions automatically creates release

## Questions?

- Open a discussion in GitHub
- Check existing documentation
- Ask in Discord community
- Email: dev@nexusai.example.com

---

Thank you for contributing!
