import { PrismaClient } from '@prisma/client'

// Prevent multiple instances in development (hot reload safe)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client (SAFE for Netlify + Next.js)
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

// Save client in dev to prevent re-creating connections
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}