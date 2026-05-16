import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET() {
  const users = await db.user.findMany()

  return NextResponse.json({
    success: true,
    users,
  })
}