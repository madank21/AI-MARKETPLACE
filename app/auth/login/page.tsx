'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/ui/navbar'
import { ParticleField } from '@/components/ui/particle-field'
import { SignIn, useSignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Loader2, Sparkles, Wallet, Mail, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState<'wallet' | 'email'>('wallet')
  const [isLoading, setIsLoading] = useState(false)
  //const { isLoaded, signIn, setActive } = useSignIn()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  // Redirect if already signed in
  if (isSignedIn) {
    router.push('/dashboard')
    return null
  }

  const handleMethodSwitch = (method: 'wallet' | 'email') => {
    setAuthMethod(method)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ParticleField className="opacity-20" particleCount={40} />
      
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />

        {/* Login Card */}
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome to NexusAI</h1>
              <p className="text-muted-foreground text-sm">
                Join the decentralized AI revolution
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
                onClick={() => handleMethodSwitch('wallet')}
                className={`flex-1 py-2 px-4 rounded-md transition-all font-medium text-sm flex items-center justify-center gap-2 ${
                  authMethod === 'wallet'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Wallet className="w-4 h-4" />
                Wallet
              </button>
              <button
                onClick={() => handleMethodSwitch('email')}
                className={`flex-1 py-2 px-4 rounded-md transition-all font-medium text-sm flex items-center justify-center gap-2 ${
                  authMethod === 'email'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            </motion.div>

            {/* Clerk SignIn - Wallet Method */}
            {authMethod === 'wallet' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SignIn 
                  routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none bg-transparent p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "hidden", // Hide social buttons for wallet view
                      socialButtonsIconButton: "hidden",
                      dividerRow: "hidden",
                      dividerText: "hidden",
                      dividerLine: "hidden",
                      form: "hidden", // Hide the email/password form
                      formButtonPrimary: "hidden",
                      formFieldInput: "hidden",
                      formFieldLabel: "hidden",
                      footer: "hidden", // Hide the footer links
                      // Style wallet buttons
                      walletButtonsContainer: "space-y-3",
                      walletButton: `w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2`,
                      walletButtonIcon: "w-5 h-5",
                      // Override Clerk's default wallet button text
                      walletButtonText: "text-white font-medium",
                    },
                    layout: {
                      socialButtonsPlacement: "bottom",
                      socialButtonsVariant: "iconButton",
                    },
                  }}
                />
              </motion.div>
            )}

            {/* Clerk SignIn - Email Method */}
            {authMethod === 'email' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SignIn 
                  routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none bg-transparent p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "hidden", // Hide social buttons for email view
                      socialButtonsIconButton: "hidden",
                      dividerRow: "hidden",
                      dividerText: "hidden",
                      dividerLine: "hidden",
                      walletButtonsContainer: "hidden", // Hide wallet buttons
                      walletButton: "hidden",
                      // Style form elements
                      formFieldInput: "bg-background/50 border border-border/50 focus:border-primary rounded-lg px-4 py-3 text-foreground w-full transition-all placeholder:text-muted-foreground",
                      formFieldLabel: "text-sm font-medium mb-2 text-foreground",
                      formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
                      formButtonPrimary: `w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 mt-4`,
                      footerActionText: "text-muted-foreground",
                      footerActionLink: "text-primary hover:text-primary/80 font-semibold transition-colors",
                      // Style the forgot password link
                      formFieldAction: "text-sm text-primary hover:text-primary/80 transition-colors",
                      // Error states
                      formFieldErrorText: "text-red-500 text-sm mt-1",
                      formFieldErrorInput: "border-red-500",
                    },
                    layout: {
                      socialButtonsPlacement: "bottom",
                      socialButtonsVariant: "iconButton",
                    },
                  }}
                />
              </motion.div>
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

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-muted-foreground text-sm">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Sign up now
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-2xl"
          />
        </motion.div>
      </div>
    </main>
  )
}