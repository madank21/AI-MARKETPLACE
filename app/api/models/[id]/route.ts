import { NextResponse } from 'next/server'
import { db } from '@/lib/database'
import { getAuthErrorResponse, requireCreator } from '@/lib/auth'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params

  const model = await db.model.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          email: true,
          walletAddress: true,
        },
      },
      reviews: {
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  })

  if (!model) {
    return NextResponse.json({ error: 'Model not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, model })
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const creator = await requireCreator()
    const { id } = await context.params
    const body = await request.json()

    const existing = await db.model.findUnique({
      where: { id },
      select: {
        id: true,
        creatorId: true,
      },
    })

    if (!existing || existing.creatorId !== creator.id) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const model = await db.model.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        tags: Array.isArray(body.tags) ? body.tags : undefined,
        version: body.version,
        ipfsHash: body.ipfsHash,
        inferenceEndpoint: body.inferenceEndpoint,
        thumbnail: body.thumbnail,
        price: body.price === undefined ? undefined : Number(body.price),
        currency: body.currency,
        visibility: body.visibility,
        featured: body.featured,
      },
    })

    await db.auditLog.create({
      data: {
        userId: creator.id,
        action: 'MODEL_UPDATED',
        targetId: model.id,
        changes: body,
      },
    })

    return NextResponse.json(model)
  } catch (error) {
    return getAuthErrorResponse(error)
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const creator = await requireCreator()
    const { id } = await context.params

    const existing = await db.model.findUnique({
      where: { id },
      select: {
        id: true,
        creatorId: true,
      },
    })

    if (!existing || existing.creatorId !== creator.id) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const model = await db.model.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        visibility: 'ARCHIVED',
      },
    })

    await db.auditLog.create({
      data: {
        userId: creator.id,
        action: 'MODEL_DELETED',
        targetId: model.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return getAuthErrorResponse(error)
  }
}
