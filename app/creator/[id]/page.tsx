// app/creators/[id]/page.tsx
import { RobohashAvatar } from '@/components/ui/robohash-avatar'
import { mockCreators } from '@/lib/mock-data'

type CreatorProfileProps = {
  params: Promise<{ id: string }>
}

export default async function CreatorProfile({ params }: CreatorProfileProps) {
  const { id } = await params
  const creator = mockCreators.find((creator) => creator.id === id)
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-16">
        <RobohashAvatar name={creator?.name || ''} size={160} className="mx-auto mb-8 shadow-2xl ring-4 ring-white/30" />
        <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text">{creator?.name}</h1>
      </div>
    </div>
  )
}
