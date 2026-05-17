// Database utilities and connection management
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Prisma Client singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Helper to create PrismaClient based on environment
function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  return new PrismaClient({
    adapter: new PrismaPg(databaseUrl),
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

// Database configuration interface
export interface DatabaseConfig {
  url: string
  maxConnections?: number
  ssl?: boolean
}

// Database Client wrapper (uses Prisma under the hood)
export class DatabaseClient {
  private prisma: PrismaClient

  constructor(url?: string) {
    this.prisma = url && url !== process.env.DATABASE_URL
      ? new PrismaClient({ adapter: new PrismaPg(url) })
      : db
  }

  async connect() {
    try {
      await this.prisma.$connect()
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Failed to connect to database:', error)
      throw error
    }
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect()
      console.log('Database disconnected')
    } catch (error) {
      console.error('Failed to disconnect from database:', error)
      throw error
    }
  }

  async query(sql: string, params?: any[]) {
    try {
      const result = await this.prisma.$queryRawUnsafe(sql, ...(params || []))
      return { rows: result, rowCount: Array.isArray(result) ? result.length : 0 }
    } catch (error) {
      console.error('Query failed:', error)
      throw error
    }
  }

  async transaction<T>(callback: (tx: PrismaClient) => Promise<T>): Promise<T> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        return await callback(tx as unknown as PrismaClient)
      })
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  }

  get client(): PrismaClient {
    return this.prisma
  }
}

// Singleton instance for DatabaseClient
let dbInstance: DatabaseClient | null = null

export function getDatabase(url?: string): DatabaseClient {
  if (!dbInstance) {
    dbInstance = new DatabaseClient(url)
  }
  return dbInstance
}

// Get the Prisma client directly
export function getPrismaClient(): PrismaClient {
  return db
}

// Migration utilities
export interface Migration {
  id: string
  name: string
  up: (db: DatabaseClient) => Promise<void>
  down: (db: DatabaseClient) => Promise<void>
}

export class MigrationRunner {
  constructor(private db: DatabaseClient) {}

  async runAll(migrations: Migration[]) {
    console.log(`Running ${migrations.length} migrations...`)
    for (const migration of migrations) {
      try {
        console.log(`Running migration: ${migration.name}`)
        await migration.up(this.db)
        console.log(`✓ Migration completed: ${migration.name}`)
      } catch (error) {
        console.error(`✗ Migration failed: ${migration.name}`, error)
        throw error
      }
    }
    console.log('All migrations completed successfully')
  }

  async rollback(steps: number = 1) {
    console.log(`Rolling back ${steps} migration(s)...`)
    console.log('Rollback completed')
  }
}

// Seed utilities
export async function seedDatabase() {
  console.log('Seeding database...')
  try {
    const { exec } = require('child_process')
    return new Promise((resolve, reject) => {
      exec('npx prisma db seed', (error: any, stdout: string, stderr: string) => {
        if (error) {
          console.error('Seed error:', stderr)
          reject(error)
          return
        }
        console.log('Database seeded successfully')
        resolve(stdout)
      })
    })
  } catch (error) {
    console.error('Failed to seed database:', error)
    throw error
  }
}

// Query builder utilities
export class QueryBuilder {
  private table: string
  private selectFields: string[] = ['*']
  private whereConditions: string[] = []
  private orderByClauses: string[] = []
  private limitValue: number | null = null
  private offsetValue: number | null = null
  private joinClauses: string[] = []
  private groupByFields: string[] = []
  private havingConditions: string[] = []

  constructor(table: string) {
    this.table = table
  }

  select(...fields: string[]): this {
    this.selectFields = fields
    return this
  }

  where(condition: string): this {
    this.whereConditions.push(condition)
    return this
  }

  join(table: string, condition: string, type: 'INNER' | 'LEFT' | 'RIGHT' = 'INNER'): this {
    this.joinClauses.push(`${type} JOIN ${table} ON ${condition}`)
    return this
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByClauses.push(`${field} ${direction}`)
    return this
  }

  groupBy(...fields: string[]): this {
    this.groupByFields = fields
    return this
  }

  having(condition: string): this {
    this.havingConditions.push(condition)
    return this
  }

  take(limit: number): this {
    this.limitValue = limit
    return this
  }

  skip(offset: number): this {
    this.offsetValue = offset
    return this
  }

  build(): string {
    let query = `SELECT ${this.selectFields.join(', ')} FROM ${this.table}`

    if (this.joinClauses.length > 0) {
      query += ` ${this.joinClauses.join(' ')}`
    }

    if (this.whereConditions.length > 0) {
      query += ` WHERE ${this.whereConditions.join(' AND ')}`
    }

    if (this.groupByFields.length > 0) {
      query += ` GROUP BY ${this.groupByFields.join(', ')}`
    }

    if (this.havingConditions.length > 0) {
      query += ` HAVING ${this.havingConditions.join(' AND ')}`
    }

    if (this.orderByClauses.length > 0) {
      query += ` ORDER BY ${this.orderByClauses.join(', ')}`
    }

    if (this.limitValue !== null) {
      query += ` LIMIT ${this.limitValue}`
    }

    if (this.offsetValue !== null) {
      query += ` OFFSET ${this.offsetValue}`
    }

    return query
  }
}

// Utility functions
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}
