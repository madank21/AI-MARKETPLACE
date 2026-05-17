import { NextResponse } from 'next/server'
import { db } from '@/lib/database'
import { getAuthErrorResponse, requireCreator } from '@/lib/auth'

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(Number(searchParams.get('page') || '1'), 1)
  const limit = Math.min(Math.max(Number(searchParams.get('limit') || '12'), 1), 50)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')

  const where = {
    deletedAt: null,
    visibility: 'PUBLIC' as const,
    ...(category ? { category } : {}),
    ...(featured === 'true' ? { featured: true } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
            { tags: { has: search } },
          ],
        }
      : {}),
  }

  const [models, total] = await Promise.all([
    db.model.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            walletAddress: true,
          },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.model.count({ where }),
  ])

  return NextResponse.json({
    success: true,
    models,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  })
}

export async function POST(request: Request) {
  try {
    const creator = await requireCreator()
    const body = await request.json()

    if (!body.title || !body.description || body.price === undefined || !body.category) {
      return NextResponse.json(
        { error: 'title, description, category, and price are required' },
        { status: 400 }
      )
    }

    const baseSlug = createSlug(body.title)
    const slug = body.slug || `${baseSlug}-${Date.now()}`

    const model = await db.model.create({
      data: {
        title: body.title,
        slug,
        description: body.description,
        category: body.category,
        tags: Array.isArray(body.tags) ? body.tags : [],
        version: body.version || '1.0.0',
        ipfsHash: body.ipfsHash || null,
        inferenceEndpoint: body.inferenceEndpoint || null,
        thumbnail: body.thumbnail || null,
        price: Number(body.price),
        currency: body.currency || 'USD',
        visibility: body.visibility || 'DRAFT',
        creatorId: creator.id,
      },
    })

    await db.auditLog.create({
      data: {
        userId: creator.id,
        action: 'MODEL_CREATED',
        targetId: model.id,
        changes: { title: model.title, slug: model.slug },
      },
    })

    return NextResponse.json(model, { status: 201 })
  } catch (error) {
    return getAuthErrorResponse(error)
  }
}
