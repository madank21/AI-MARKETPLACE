import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Get all AI models from database
    // This should support:
    // - Pagination
    // - Filtering by category
    // - Sorting by popularity, rating, price
    // - Search functionality

    const models = [
      {
        id: '1',
        name: 'GPT-Vision Clone',
        creator: 'AI Labs',
        category: 'Language Model',
        rating: 4.8,
        downloads: 2400,
        price: 0.05,
        image: '/models/gpt-vision.png',
      },
      {
        id: '2',
        name: 'BERT Sentiment Analysis',
        creator: 'NLP Team',
        category: 'NLP',
        rating: 4.6,
        downloads: 1398,
        price: 0.03,
        image: '/models/bert.png',
      },
      {
        id: '3',
        name: 'Stable Diffusion XL',
        creator: 'Image Labs',
        category: 'Image Generation',
        rating: 4.9,
        downloads: 9800,
        price: 0.08,
        image: '/models/diffusion.png',
      },
    ]

    return NextResponse.json(
      { success: true, models },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}
