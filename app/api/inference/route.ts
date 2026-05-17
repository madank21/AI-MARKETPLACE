import { NextResponse } from 'next/server'
import { db } from '@/lib/database'
import { getAuthErrorResponse, requireUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const userId = await requireUser()
    const { modelId, input } = await request.json()

    if (!modelId || input === undefined) {
      return NextResponse.json(
        { error: 'modelId and input are required' },
        { status: 400 }
      )
    }

    const model = await db.model.findFirst({
      where: {
        id: modelId,
        deletedAt: null,
        visibility: 'PUBLIC',
      },
      select: {
        id: true,
        inferenceEndpoint: true,
      },
    })

    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const result = {
      success: true,
      output: 'Model inference result',
      latency: 124,
      tokens_used: 150,
      timestamp: new Date().toISOString(),
    }

    await db.usageLog.create({
      data: {
        userId,
        modelId: model.id,
        tokensUsed: result.tokens_used,
        latency: result.latency,
        status: 'SUCCESS',
        metadata: {
          input,
          inferenceEndpoint: model.inferenceEndpoint,
        },
      },
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return getAuthErrorResponse(error)
  }
}
