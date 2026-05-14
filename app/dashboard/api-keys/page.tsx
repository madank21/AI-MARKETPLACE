'use client'

import { useState } from 'react'
import { GlowCard, GlowButton } from '@/components/ui/glow-card'
import { GradientText } from '@/components/ui/gradient-text'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

// Mock API keys
const mockApiKeys = [
  {
    id: 'key-1',
    name: 'Production Key',
    key: 'nxai_prod_sk_1a2b3c4d5e6f7g8h9i0j',
    created: '2024-02-15',
    lastUsed: '2 hours ago',
    permissions: 'full',
    status: 'active',
  },
  {
    id: 'key-2',
    name: 'Development Key',
    key: 'nxai_dev_sk_9z8y7x6w5v4u3t2s1r0q',
    created: '2024-03-01',
    lastUsed: '1 day ago',
    permissions: 'read',
    status: 'active',
  },
  {
    id: 'key-3',
    name: 'Test Key',
    key: 'nxai_test_sk_abcdefghijklmnopqrst',
    created: '2024-03-10',
    lastUsed: 'Never',
    permissions: 'full',
    status: 'inactive',
  },
]

export default function APIKeysPage() {
  const [keys, setKeys] = useState(mockApiKeys)
  const [showKey, setShowKey] = useState<string | null>(null)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPermission, setNewKeyPermission] = useState('full')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const copyToClipboard = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '...' + key.substring(key.length - 4)
  }

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return
    
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `nxai_${newKeyPermission === 'full' ? 'prod' : 'read'}_sk_${Math.random().toString(36).substring(2, 22)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: newKeyPermission,
      status: 'active',
    }
    
    setKeys([newKey, ...keys])
    setNewKeyName('')
    setNewKeyPermission('full')
    setIsCreateDialogOpen(false)
  }

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              <GradientText variant="blue-cyan">API Keys</GradientText>
            </h1>
            <p className="text-muted-foreground">
              Manage your API keys for accessing NexusAI models.
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <GlowButton>
                <Plus className="w-4 h-4 mr-2" />
                Create New Key
              </GlowButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key to authenticate your requests.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Key Name</Label>
                  <Input
                    id="name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production Key"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <Select value={newKeyPermission} onValueChange={setNewKeyPermission}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Access</SelectItem>
                      <SelectItem value="read">Read Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <GlowButton onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                  Create Key
                </GlowButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </AnimatedContainer>

      {/* Warning Banner */}
      <AnimatedContainer delay={0.1}>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-500 mb-1">Keep your API keys secure</h4>
              <p className="text-sm text-muted-foreground">
                Never share your API keys or commit them to version control. Use environment variables instead.
              </p>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {/* API Keys List */}
      <StaggerContainer className="space-y-4" staggerDelay={0.1}>
        {keys.map((apiKey) => (
          <StaggerItem key={apiKey.id}>
            <GlowCard className="p-6" glowColor={apiKey.status === 'active' ? 'blue' : 'purple'}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Key Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    apiKey.status === 'active' ? 'bg-primary/10' : 'bg-muted/50'
                  }`}>
                    <Key className={`w-6 h-6 ${apiKey.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{apiKey.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={apiKey.status === 'active' ? 'border-green-500/30 text-green-500' : 'border-muted text-muted-foreground'}
                      >
                        {apiKey.status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {apiKey.permissions}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 font-mono">
                        {showKey === apiKey.id ? apiKey.key : maskKey(apiKey.key)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground lg:border-l lg:border-border/50 lg:pl-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Created {apiKey.created}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Last used {apiKey.lastUsed}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                  >
                    {showKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  >
                    {copiedKey === apiKey.id ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteKey(apiKey.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Usage Tips */}
      <AnimatedContainer delay={0.4}>
        <GlowCard className="p-6" glowColor="cyan">
          <h3 className="text-lg font-semibold mb-4">API Key Usage</h3>
          <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-muted-foreground">
{`# Include your API key in the Authorization header
curl -X POST https://api.nexusai.io/v1/models/model-1/inference \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Hello, world!"}'`}
            </pre>
          </div>
        </GlowCard>
      </AnimatedContainer>
    </div>
  )
}
