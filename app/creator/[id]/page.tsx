// app/creators/[id]/page.tsx
import { RobohashAvatar } from '@/components/ui/robohash-avatar'
import { mockCreators } from '@/lib/mock-data'

export default function CreatorProfile({ params }: { params: { id: string } }) {
  const creator = mockCreators.find(c => c.id === params.id)
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-16">
        <RobohashAvatar name={creator?.name || ''} size={160} className="mx-auto mb-8 shadow-2xl ring-4 ring-white/30" />
        <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text">{creator?.name}</h1>
      </div>
    </div>
  )
}