'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SignUp, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ParticleField } from '@/components/ui/particle-field'
import { Sparkles } from 'lucide-react'

export default function SignupPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) return

    async function syncUser() {
      try {
        await fetch('/api/users/sync', { method: 'POST' })
      } finally {
        router.push('/dashboard')
      }
    }

    syncUser()
  }, [isSignedIn, router])

  if (isSignedIn) return null

  return (
    <main className="min-h-screen bg-background">
      <ParticleField className="opacity-20" particleCount={40} />

      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          <div className="glass-card rounded-2xl border border-border/50 p-8 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-primary">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Join NexusAI</h1>
              <p className="text-sm text-muted-foreground">
                Create your secure account with Clerk
              </p>
            </motion.div>

            <SignUp
              routing="hash"
              signInUrl="/auth/login"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none bg-transparent p-0',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  formFieldInput:
                    'bg-background/50 border border-border/50 focus:border-primary rounded-lg px-4 py-3 text-foreground w-full transition-all placeholder:text-muted-foreground',
                  formFieldLabel: 'text-sm font-medium mb-2 text-foreground',
                  formButtonPrimary:
                    'w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-white font-medium py-3 px-6 rounded-lg mt-4',
                  footerActionText: 'text-muted-foreground',
                  footerActionLink:
                    'text-primary hover:text-primary/80 font-semibold transition-colors',
                  formFieldErrorText: 'text-red-500 text-sm mt-1',
                  formFieldErrorInput: 'border-red-500',
                },
              }}
            />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
