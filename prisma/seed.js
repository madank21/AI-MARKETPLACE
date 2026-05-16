const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
})

async function main() {
  const creator = await prisma.user.upsert({
    where: { id: 'user_seed_creator' },
    update: {},
    create: {
      id: 'user_seed_creator',
      email: 'creator@nexusai.local',
      username: 'nexus-creator',
      role: 'CREATOR',
    },
  })

  const user = await prisma.user.upsert({
    where: { id: 'user_seed_buyer' },
    update: {},
    create: {
      id: 'user_seed_buyer',
      email: 'buyer@nexusai.local',
      username: 'nexus-buyer',
      role: 'USER',
    },
  })

  const model = await prisma.model.upsert({
    where: { slug: 'gpt-vision-clone' },
    update: {},
    create: {
      title: 'GPT-Vision Clone',
      slug: 'gpt-vision-clone',
      description: 'A multimodal demo model for image and text analysis.',
      category: 'Language Model',
      tags: ['vision', 'language', 'multimodal'],
      price: 0.05,
      visibility: 'PUBLIC',
      featured: true,
      thumbnail: '/placeholder.jpg',
      creatorId: creator.id,
    },
  })

  await prisma.review.upsert({
    where: {
      userId_modelId: {
        userId: user.id,
        modelId: model.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      modelId: model.id,
      rating: 5,
      title: 'Excellent starter model',
      content: 'Fast responses and a clean API surface.',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
