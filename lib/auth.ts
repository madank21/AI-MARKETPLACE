import { auth } from '@clerk/nextjs/server'
import { db } from './database'

export class AuthError extends Error {
  constructor(
    message: string,
    public status = 401
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function requireUser() {
  const { userId } = await auth()

  if (!userId) {
    throw new AuthError('Unauthorized', 401)
  }

  return userId
}

export async function getCurrentDbUser() {
  const userId = await requireUser()

  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new AuthError('User is not synced', 404)
  }

  return user
}

export async function requireCreator() {
  const user = await getCurrentDbUser()

  if (user.role !== 'CREATOR' && user.role !== 'ADMIN') {
    throw new AuthError('Forbidden', 403)
  }

  return user
}

export async function requireAdmin() {
  const user = await getCurrentDbUser()

  if (user.role !== 'ADMIN') {
    throw new AuthError('Forbidden', 403)
  }

  return user
}

export function getAuthErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return Response.json({ error: error.message }, { status: error.status })
  }

  return Response.json({ error: 'Internal server error' }, { status: 500 })
}
