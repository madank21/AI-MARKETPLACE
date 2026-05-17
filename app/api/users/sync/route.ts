import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const clerkUser = await currentUser()

  if (!clerkUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress

  if (!email) {
    return NextResponse.json({ error: 'User email not found' }, { status: 400 })
  }

  const user = await db.user.upsert({
    where: { id: userId },
    update: {
      email,
      username: clerkUser.username || clerkUser.firstName || null,
    },
    create: {
      id: userId,
      email,
      username: clerkUser.username || clerkUser.firstName || null,
    },
  })

  return NextResponse.json(user)
}
