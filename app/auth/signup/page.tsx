'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/ui/navbar'
import { GradientText } from '@/components/ui/gradient-text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ParticleField } from '@/components/ui/particle-field'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Loader2, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<'email' | 'wallet'>('wallet')
  const { address, isConnected } = useAccount()

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Account created successfully!')
      window.location.href = '/dashboard'
    } catch (error) {
      toast.error('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletSignup = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Account created with wallet!')
      window.location.href = '/dashboard'
    } catch (error) {
      toast.error('Wallet signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ParticleField className="opacity-20" particleCount={40} />
      
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30" />

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          <div className="glass-card rounded-2xl border border-border/50 p-8 backdrop-blur-xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Join NexusAI</h1>
              <p className="text-muted-foreground text-sm">
                Become part of the AI revolution
              </p>
            </motion.div>

            {/* Auth Method Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2 mb-6 bg-background/50 rounded-lg p-1"
            >
              <button
                onClick={() => setAuthMethod('wallet')}
                className={`flex-1 py-2 px-4 rounded-md transition-all font-medium text-sm ${
                  authMethod === 'wallet'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Wallet
              </button>
              <button
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md transition-all font-medium text-sm ${
                  authMethod === 'email'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Email
              </button>
            </motion.div>

            {/* Wallet Signup */}
            {authMethod === 'wallet' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                  <ConnectButton />
                </div>
                <Button
                  onClick={handleWalletSignup}
                  disabled={!isConnected || isLoading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isLoading ? 'Creating account...' : 'Sign up with Wallet'}
                </Button>

                {/* Features */}
                <div className="mt-6 space-y-2 text-sm">
                  {['Instant verification', 'Full Web3 integration', 'Secure transactions'].map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Email Signup */}
            {authMethod === 'email' && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleEmailSignup}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </motion.form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-muted-foreground text-sm">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Login here
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"
          />
        </motion.div>
      </div>
    </main>
  )
}
