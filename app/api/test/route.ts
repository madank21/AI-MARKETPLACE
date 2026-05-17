import { NextResponse } from 'next/server'
import { db } from '@/lib/database'
import { getAuthErrorResponse, requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    const users = await db.user.findMany()

    return NextResponse.json({
      success: true,
      users,
    })
  } catch (error) {
    return getAuthErrorResponse(error)
  }
}
