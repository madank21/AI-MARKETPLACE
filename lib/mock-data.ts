// AI Model Types
export interface AIModel {
  id: string
  name: string
  description: string
  shortDescription: string
  category: ModelCategory
  creator: Creator
  pricing: Pricing
  stats: ModelStats
  capabilities: string[]
  tags: string[]
  image: string
  verified: boolean
  featured: boolean
  trending: boolean
  createdAt: string
  updatedAt: string
}

export interface Creator {
  id: string
  name: string
  avatar: string
  verified: boolean
  totalModels: number
  totalEarnings: string
  rating: number
  followers: number
}

export interface Pricing {
  type: 'free' | 'pay-per-use' | 'subscription' | 'one-time'
  price: number
  currency: 'ETH' | 'USDC' | 'NEXUS'
  perUnit?: string
}

export interface ModelStats {
  totalCalls: number
  avgLatency: number
  uptime: number
  rating: number
  reviews: number
  downloads: number
}

export type ModelCategory =
  | 'text-generation'
  | 'image-generation'
  | 'code-generation'
  | 'audio-generation'
  | 'video-generation'
  | 'translation'
  | 'summarization'
  | 'classification'
  | 'embedding'
  | 'multimodal'

export const categoryLabels: Record<ModelCategory, string> = {
  'text-generation': 'Text Generation',
  'image-generation': 'Image Generation',
  'code-generation': 'Code Generation',
  'audio-generation': 'Audio Generation',
  'video-generation': 'Video Generation',
  'translation': 'Translation',
  'summarization': 'Summarization',
  'classification': 'Classification',
  'embedding': 'Embedding',
  'multimodal': 'Multimodal',
}

export const categoryIcons: Record<ModelCategory, string> = {
  'text-generation': '📝',
  'image-generation': '🎨',
  'code-generation': '💻',
  'audio-generation': '🎵',
  'video-generation': '🎬',
  'translation': '🌐',
  'summarization': '📋',
  'classification': '🏷️',
  'embedding': '🔢',
  'multimodal': '🔮',
}

// Mock Creators
export const mockCreators: Creator[] = [
  {
    id: 'creator-1',
    name: 'Neural Labs',
    avatar: '/avatars/neural-labs.jpg',
    verified: true,
    totalModels: 12,
    totalEarnings: '245.8 ETH',
    rating: 4.9,
    followers: 15420,
  },
  {
    id: 'creator-2',
    name: 'DeepMind Collective',
    avatar: '/avatars/deepmind.jpg',
    verified: true,
    totalModels: 8,
    totalEarnings: '189.3 ETH',
    rating: 4.8,
    followers: 12350,
  },
  {
    id: 'creator-3',
    name: 'Quantum AI Research',
    avatar: '/avatars/quantum.jpg',
    verified: true,
    totalModels: 15,
    totalEarnings: '312.5 ETH',
    rating: 4.95,
    followers: 23100,
  },
  {
    id: 'creator-4',
    name: 'Synth Intelligence',
    avatar: '/avatars/synth.jpg',
    verified: false,
    totalModels: 5,
    totalEarnings: '45.2 ETH',
    rating: 4.5,
    followers: 3200,
  },
  {
    id: 'creator-5',
    name: 'Nexus Innovations',
    avatar: '/avatars/nexus.jpg',
    verified: true,
    totalModels: 20,
    totalEarnings: '520.1 ETH',
    rating: 4.92,
    followers: 45000,
  },
]

// Mock AI Models
export const mockModels: AIModel[] = [
  {
    id: 'model-1',
    name: 'NexusGPT-4 Ultra',
    description: 'Our most advanced language model yet. NexusGPT-4 Ultra represents a quantum leap in natural language understanding and generation. With 1.7 trillion parameters and trained on a diverse corpus of human knowledge, it excels at complex reasoning, creative writing, code generation, and multimodal tasks. Features enhanced context windows up to 128K tokens and supports real-time streaming responses.',
    shortDescription: 'Advanced language model with 1.7T parameters for complex reasoning and generation.',
    category: 'text-generation',
    creator: mockCreators[0],
    pricing: { type: 'pay-per-use', price: 0.0001, currency: 'ETH', perUnit: '1K tokens' },
    stats: { totalCalls: 15420000, avgLatency: 120, uptime: 99.99, rating: 4.9, reviews: 2845, downloads: 45230 },
    capabilities: ['Text Generation', 'Code Generation', 'Translation', 'Summarization', 'Q&A', 'Creative Writing'],
    tags: ['GPT', 'Large Language Model', 'Transformer', 'Multi-task'],
    image: '/models/nexusgpt.jpg',
    verified: true,
    featured: true,
    trending: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: 'model-2',
    name: 'DreamForge XL',
    description: 'State-of-the-art image generation model capable of creating photorealistic images from text descriptions. DreamForge XL uses a revolutionary diffusion architecture with enhanced attention mechanisms for unprecedented detail and coherence. Supports various art styles, aspect ratios, and advanced controlnet features.',
    shortDescription: 'Photorealistic image generation with revolutionary diffusion architecture.',
    category: 'image-generation',
    creator: mockCreators[2],
    pricing: { type: 'pay-per-use', price: 0.0005, currency: 'ETH', perUnit: 'image' },
    stats: { totalCalls: 8920000, avgLatency: 3500, uptime: 99.95, rating: 4.85, reviews: 1923, downloads: 32100 },
    capabilities: ['Text-to-Image', 'Image-to-Image', 'Inpainting', 'Outpainting', 'Style Transfer', 'ControlNet'],
    tags: ['Diffusion', 'Image Generation', 'Art', 'Photorealistic'],
    image: '/models/dreamforge.jpg',
    verified: true,
    featured: true,
    trending: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-18',
  },
  {
    id: 'model-3',
    name: 'CodeNinja Pro',
    description: 'Specialized code generation and analysis model trained on billions of lines of code across 50+ programming languages. CodeNinja Pro understands context, can refactor existing code, detect bugs, write tests, and generate documentation. Perfect for developers looking to accelerate their workflow.',
    shortDescription: 'Expert code generation across 50+ languages with bug detection.',
    category: 'code-generation',
    creator: mockCreators[1],
    pricing: { type: 'subscription', price: 0.05, currency: 'ETH', perUnit: 'month' },
    stats: { totalCalls: 5230000, avgLatency: 85, uptime: 99.98, rating: 4.92, reviews: 1456, downloads: 28400 },
    capabilities: ['Code Generation', 'Bug Detection', 'Code Review', 'Documentation', 'Test Generation', 'Refactoring'],
    tags: ['Code', 'Programming', 'Developer Tools', 'Multi-language'],
    image: '/models/codeninja.jpg',
    verified: true,
    featured: true,
    trending: false,
    createdAt: '2024-01-28',
    updatedAt: '2024-03-15',
  },
  {
    id: 'model-4',
    name: 'SonicWave AI',
    description: 'Advanced audio generation model capable of creating music, speech, and sound effects from text prompts or audio inputs. Features voice cloning, music composition, and real-time audio processing capabilities.',
    shortDescription: 'Music and audio generation with voice cloning capabilities.',
    category: 'audio-generation',
    creator: mockCreators[3],
    pricing: { type: 'pay-per-use', price: 0.0003, currency: 'ETH', perUnit: 'minute' },
    stats: { totalCalls: 2340000, avgLatency: 2800, uptime: 99.9, rating: 4.7, reviews: 892, downloads: 15600 },
    capabilities: ['Music Generation', 'Voice Synthesis', 'Voice Cloning', 'Sound Effects', 'Audio Enhancement'],
    tags: ['Audio', 'Music', 'Voice', 'TTS'],
    image: '/models/sonicwave.jpg',
    verified: false,
    featured: false,
    trending: true,
    createdAt: '2024-02-20',
    updatedAt: '2024-03-12',
  },
  {
    id: 'model-5',
    name: 'VideoGen Studio',
    description: 'Cutting-edge video generation model that creates high-quality videos from text descriptions or images. Supports various styles from photorealistic to animated, with advanced motion control and scene composition.',
    shortDescription: 'High-quality video generation from text with motion control.',
    category: 'video-generation',
    creator: mockCreators[4],
    pricing: { type: 'pay-per-use', price: 0.01, currency: 'ETH', perUnit: 'video' },
    stats: { totalCalls: 890000, avgLatency: 45000, uptime: 99.8, rating: 4.6, reviews: 456, downloads: 8900 },
    capabilities: ['Text-to-Video', 'Image-to-Video', 'Video Editing', 'Motion Control', 'Style Transfer'],
    tags: ['Video', 'Animation', 'Motion', 'Creative'],
    image: '/models/videogen.jpg',
    verified: true,
    featured: false,
    trending: true,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-19',
  },
  {
    id: 'model-6',
    name: 'PolyGlot Translator',
    description: 'Neural machine translation model supporting 200+ languages with context-aware translation. Preserves tone, idioms, and cultural nuances for professional-grade translations.',
    shortDescription: 'Neural translation for 200+ languages with cultural nuance.',
    category: 'translation',
    creator: mockCreators[0],
    pricing: { type: 'pay-per-use', price: 0.00005, currency: 'ETH', perUnit: '1K chars' },
    stats: { totalCalls: 12500000, avgLatency: 65, uptime: 99.99, rating: 4.88, reviews: 2134, downloads: 52300 },
    capabilities: ['Text Translation', 'Document Translation', 'Real-time Translation', 'Context Preservation'],
    tags: ['Translation', 'NLP', 'Multilingual', 'Localization'],
    image: '/models/polyglot.jpg',
    verified: true,
    featured: false,
    trending: false,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-05',
  },
  {
    id: 'model-7',
    name: 'SynthVision Pro',
    description: 'Multimodal AI model that combines vision, language, and reasoning capabilities. Analyze images, answer questions about visual content, and generate detailed descriptions.',
    shortDescription: 'Multimodal AI combining vision, language, and reasoning.',
    category: 'multimodal',
    creator: mockCreators[2],
    pricing: { type: 'pay-per-use', price: 0.0002, currency: 'ETH', perUnit: 'query' },
    stats: { totalCalls: 6780000, avgLatency: 180, uptime: 99.95, rating: 4.82, reviews: 1678, downloads: 38200 },
    capabilities: ['Image Analysis', 'Visual Q&A', 'Image Captioning', 'OCR', 'Document Understanding'],
    tags: ['Multimodal', 'Vision', 'Analysis', 'Understanding'],
    image: '/models/synthvision.jpg',
    verified: true,
    featured: true,
    trending: false,
    createdAt: '2024-02-05',
    updatedAt: '2024-03-17',
  },
  {
    id: 'model-8',
    name: 'EmbedMaster 3000',
    description: 'High-dimensional embedding model for semantic search, clustering, and similarity matching. Supports text, images, and code with unified embedding space.',
    shortDescription: 'Universal embeddings for semantic search and similarity.',
    category: 'embedding',
    creator: mockCreators[1],
    pricing: { type: 'free', price: 0, currency: 'ETH' },
    stats: { totalCalls: 45000000, avgLatency: 25, uptime: 99.99, rating: 4.75, reviews: 3456, downloads: 89200 },
    capabilities: ['Text Embeddings', 'Image Embeddings', 'Code Embeddings', 'Semantic Search', 'Clustering'],
    tags: ['Embeddings', 'Search', 'Vectors', 'Free'],
    image: '/models/embedmaster.jpg',
    verified: true,
    featured: false,
    trending: false,
    createdAt: '2023-12-01',
    updatedAt: '2024-02-28',
  },
]

// Platform Stats
export const platformStats = {
  totalModels: 2847,
  totalCreators: 1234,
  totalTransactions: 15420000,
  totalVolume: '45,892 ETH',
  activeUsers: 892340,
  avgUptime: 99.95,
}

// Trending Categories
export const trendingCategories = [
  { category: 'image-generation' as ModelCategory, growth: '+245%', models: 456 },
  { category: 'video-generation' as ModelCategory, growth: '+189%', models: 123 },
  { category: 'multimodal' as ModelCategory, growth: '+156%', models: 234 },
  { category: 'code-generation' as ModelCategory, growth: '+98%', models: 389 },
]

// Recent Activity
export interface Activity {
  id: string
  type: 'purchase' | 'deploy' | 'rating' | 'earning'
  model: string
  user: string
  amount?: string
  rating?: number
  timestamp: string
}

export const recentActivity: Activity[] = [
  { id: '1', type: 'purchase', model: 'NexusGPT-4 Ultra', user: '0x1234...5678', amount: '0.5 ETH', timestamp: '2 min ago' },
  { id: '2', type: 'deploy', model: 'DreamForge XL', user: 'Neural Labs', timestamp: '5 min ago' },
  { id: '3', type: 'rating', model: 'CodeNinja Pro', user: '0xabcd...efgh', rating: 5, timestamp: '8 min ago' },
  { id: '4', type: 'earning', model: 'SonicWave AI', user: 'Synth Intelligence', amount: '2.3 ETH', timestamp: '12 min ago' },
  { id: '5', type: 'purchase', model: 'VideoGen Studio', user: '0x9876...5432', amount: '1.2 ETH', timestamp: '15 min ago' },
]

// Compute Providers
export interface ComputeProvider {
  id: string
  name: string
  location: string
  gpuType: string
  gpuCount: number
  pricePerHour: number
  availability: number
  latency: number
  rating: number
}

export const computeProviders: ComputeProvider[] = [
  { id: 'cp-1', name: 'NexusCloud Alpha', location: 'US-East', gpuType: 'H100', gpuCount: 8, pricePerHour: 0.02, availability: 98, latency: 12, rating: 4.9 },
  { id: 'cp-2', name: 'QuantumNodes', location: 'EU-West', gpuType: 'A100', gpuCount: 4, pricePerHour: 0.015, availability: 95, latency: 25, rating: 4.7 },
  { id: 'cp-3', name: 'DecentraGPU', location: 'Asia-Pacific', gpuType: 'H100', gpuCount: 16, pricePerHour: 0.025, availability: 99, latency: 45, rating: 4.85 },
  { id: 'cp-4', name: 'NodeMatrix', location: 'US-West', gpuType: 'A100', gpuCount: 8, pricePerHour: 0.018, availability: 97, latency: 18, rating: 4.8 },
]

// Add this to your existing mock-data.ts
export const mockModels1 = [
  {
    id: '1',
    name: 'Nova AI Pro',
    creator: 'Alex Chen',
    rating: 4.9,
    downloads: 12450,
    price: 29,
    category: 'Image Gen',
    verified: true,
    trending: true,
    tags: ['Stable Diffusion', 'High Fidelity', 'Commercial']
  },
  {
    id: '2',
    name: 'Quantum Code',
    creator: 'Sarah Kim',
    rating: 4.8,
    downloads: 8920,
    price: 0,
    category: 'Code Gen',
    verified: true,
    trending: false,
    tags: ['GPT-4', 'Code Completion', 'TypeScript']
  },
  {
    id: '3',
    name: 'PixelForge XL',
    creator: 'Jamie Ruiz',
    rating: 4.95,
    downloads: 21500,
    price: 49,
    category: 'Image Gen',
    verified: true,
    trending: true,
    tags: ['Midjourney', '4K', 'Artistic']
  },
  {
    id: '4',
    name: 'SynthText Pro',
    creator: 'Elena Voss',
    rating: 4.7,
    downloads: 6730,
    price: 19,
    category: 'Text Gen',
    verified: false,
    trending: false,
    tags: ['Llama 2', 'Creative', 'Longform']
  },
  {
    id: '1', name: 'Nova AI Pro', creator: 'Alex Chen', rating: 4.9, downloads: 12450, price: 29, category: 'Image Gen', verified: true, trending: true, tags: ['Stable Diffusion', 'High Fidelity', 'Commercial'], preview: '/api/placeholder/400/300'
  },
  {
    id: '2', name: 'Quantum Code', creator: 'Sarah Kim', rating: 4.8, downloads: 8920, price: 0, category: 'Code Gen', verified: true, trending: false, tags: ['GPT-4', 'Code Completion', 'TypeScript'], preview: '/api/placeholder/400/300'
  },
  {
    id: '3', name: 'PixelForge XL', creator: 'Jamie Ruiz', rating: 4.95, downloads: 21500, price: 49, category: 'Image Gen', verified: true, trending: true, tags: ['Midjourney', '4K', 'Artistic'], preview: '/api/placeholder/400/300'
  },
  {
    id: '4', name: 'SynthText Pro', creator: 'Elena Voss', rating: 4.7, downloads: 6730, price: 19, category: 'Text Gen', verified: false, trending: false, tags: ['Llama 2', 'Creative', 'Longform'], preview: '/api/placeholder/400/300'
  },
  {
    id: '5', name: 'VectorFlow', creator: 'Marcus Lee', rating: 4.85, downloads: 18900, price: 39, category: 'Image Gen', verified: true, trending: true, tags: ['SVG', 'Vector', 'Logo Design'], preview: '/api/placeholder/400/300'
  },
  {
    id: '6', name: 'CodeMaster AI', creator: 'Priya Singh', rating: 4.92, downloads: 23400, price: 0, category: 'Code Gen', verified: true, trending: false, tags: ['Rust', 'Smart Contracts', 'Web3'], preview: '/api/placeholder/400/300'
  },
  {
    id: '7', name: 'DreamScape', creator: 'Luca Rossi', rating: 4.88, downloads: 15600, price: 59, category: 'Image Gen', verified: true, trending: true, tags: ['Dreams', 'Surreal', '8K'], preview: '/api/placeholder/400/300'
  },
  {
    id: '8', name: 'Narrative Engine', creator: 'Aiko Tanaka', rating: 4.75, downloads: 8900, price: 25, category: 'Text Gen', verified: false, trending: false, tags: ['Stories', 'RPG', 'Interactive'], preview: '/api/placeholder/400/300'
  },
  {
    id: '9', name: 'HyperVision 4K', creator: 'David Park', rating: 4.96, downloads: 31200, price: 79, category: 'Image Gen', verified: true, trending: true, tags: ['4K', 'Realistic', 'Portrait'], preview: '/api/placeholder/400/300'
  },
  {
    id: '10', name: 'SmartContract Pro', creator: 'Rohan Patel', rating: 4.91, downloads: 14500, price: 45, category: 'Code Gen', verified: true, trending: false, tags: ['Solidity', 'Ethereum', 'DeFi'], preview: '/api/placeholder/400/300'
  },
  {
    id: '11', name: 'Cosmic Art', creator: 'Luna Morales', rating: 4.82, downloads: 19800, price: 35, category: 'Image Gen', verified: true, trending: true, tags: ['Space', 'Nebula', 'Sci-Fi'], preview: '/api/placeholder/400/300'
  },
  {
    id: '12', name: 'Poetry Master', creator: 'Emma Wilson', rating: 4.78, downloads: 7650, price: 15, category: 'Text Gen', verified: false, trending: false, tags: ['Poetry', 'Creative', 'Rhyme'], preview: '/api/placeholder/400/300'
  }
]
