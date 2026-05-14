// Database types
export interface User {
  id: string
  email: string
  username: string
  walletAddress?: string
  role: 'user' | 'creator' | 'admin'
  avatar?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface AIModel {
  id: string
  name: string
  description: string
  creator: User
  category: string
  version: string
  ipfsHash: string
  price: number
  currency: 'USD' | 'ETH'
  rating: number
  reviewCount: number
  downloads: number
  imageUrl: string
  documentationUrl?: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface Transaction {
  id: string
  userId: string
  modelId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  stripePaymentId?: string
  txHash?: string
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  modelId: string
  plan: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired'
  monthlyPrice: number
  startDate: Date
  endDate?: Date
  autoRenew: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  userId: string
  modelId: string
  rating: number
  title: string
  content: string
  helpful: number
  createdAt: Date
  updatedAt: Date
}

export interface UsageLog {
  id: string
  userId: string
  modelId: string
  tokensUsed: number
  latency: number
  status: 'success' | 'failed'
  timestamp: Date
}

export interface Notification {
  id: string
  userId: string
  type: 'payment' | 'review' | 'message' | 'system'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: Date
}

export interface GovernanceVote {
  id: string
  proposalId: string
  userId: string
  vote: 'yes' | 'no' | 'abstain'
  weight: number
  timestamp: Date
}

export interface ReputationScore {
  id: string
  userId: string
  score: number
  totalReviews: number
  averageRating: number
  reliabilityScore: number
  lastUpdated: Date
}

export interface Stake {
  id: string
  userId: string
  amount: number
  duration: number
  rewards: number
  startDate: Date
  endDate: Date
  claimed: boolean
  claimedAt?: Date
}

export interface AuditLog {
  id: string
  action: string
  userId?: string
  targetId?: string
  changes: Record<string, unknown>
  ipAddress?: string
  timestamp: Date
}
