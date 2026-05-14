'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { GradientText } from '@/components/ui/gradient-text'
import { Button } from '@/components/ui/button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Zap,
  Key,
  CreditCard,
  Settings,
  Bell,
  HelpCircle,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Users,
  Shield,
  LogOut,
} from 'lucide-react'

interface SidebarLink {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const userLinks: SidebarLink[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/models', label: 'My Models', icon: Zap },
  { href: '/dashboard/api-keys', label: 'API Keys', icon: Key },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

const creatorLinks: SidebarLink[] = [
  { href: '/creator', label: 'Overview', icon: LayoutDashboard },
  { href: '/creator/models', label: 'My Models', icon: Zap, badge: '3' },
  { href: '/creator/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/creator/earnings', label: 'Earnings', icon: CreditCard },
  { href: '/creator/settings', label: 'Settings', icon: Settings },
]

const adminLinks: SidebarLink[] = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/models', label: 'Models', icon: Zap },
  { href: '/admin/moderation', label: 'Moderation', icon: Shield },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  variant?: 'user' | 'creator' | 'admin'
}

export function DashboardLayout({ children, variant = 'user' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const links = variant === 'admin' ? adminLinks : variant === 'creator' ? creatorLinks : userLinks
  const title = variant === 'admin' ? 'Admin' : variant === 'creator' ? 'Creator' : 'Dashboard'

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 bg-card/80 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border/50">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">
                  <GradientText variant="blue-cyan">NexusAI</GradientText>
                </span>
                <div className="text-xs text-muted-foreground">{title}</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/dashboard' && link.href !== '/creator' && link.href !== '/admin' && pathname.startsWith(link.href))
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="flex-1">{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                      {link.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border/50 space-y-2">
            <Link
              href="/help"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </Link>
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full">
              <LogOut className="w-5 h-5" />
              Disconnect
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Breadcrumb - Desktop */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{title}</span>
              {pathname !== '/dashboard' && pathname !== '/creator' && pathname !== '/admin' && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium capitalize">
                    {pathname.split('/').pop()?.replace('-', ' ')}
                  </span>
                </>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </Button>

              {/* Wallet */}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted
                  const connected = ready && account && chain

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {connected ? (
                        <Button
                          variant="outline"
                          onClick={openAccountModal}
                          className="gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          {account.displayName}
                        </Button>
                      ) : (
                        <Button
                          onClick={openConnectModal}
                          className="bg-gradient-to-r from-primary to-secondary"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
