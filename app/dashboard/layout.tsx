// app/dashboard/layout.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  LayoutDashboard,
  Key,
  CreditCard,
  Settings,
  Bell,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Users,
  LogOut,
  Brain,
  BarChart3,
  Cpu,
  Rocket,
  FlaskConical,
  Star,
  BookOpen,
  MessageSquare,
  Boxes,
  Activity,
} from 'lucide-react'

// Interfaces
interface SidebarLink {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  badgeColor?: 'blue' | 'purple' | 'cyan' | 'pink' | 'green'
  isNew?: boolean
}

interface SidebarGroup {
  label: string
  links: SidebarLink[]
}

// Navigation groups
const userGroups: SidebarGroup[] = [
  {
    label: 'CORE',
    links: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/models', label: 'My Models', icon: Brain, badge: '5' },
      { href: '/dashboard/playground', label: 'Playground', icon: FlaskConical, isNew: true },
      { href: '/dashboard/deployments', label: 'Deployments', icon: Rocket, isNew: true },
    ],
  },
  {
    label: 'INTELLIGENCE',
    links: [
      { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/dashboard/compute', label: 'Compute Nodes', icon: Cpu, isNew: true },
      { href: '/dashboard/activity', label: 'Activity Feed', icon: Activity },
    ],
  },
  {
    label: 'ACCESS',
    links: [
      { href: '/dashboard/api-keys', label: 'API Keys', icon: Key, badge: '3' },
      { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
      { href: '/dashboard/integrations', label: 'Integrations', icon: Boxes, isNew: true },
    ],
  },
  {
    label: 'ACCOUNT',
    links: [
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
]

// Neural Network Background
function NeuralNetBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number }
    const nodes: Node[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.02
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100,180,255,${0.12 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
        const alpha = 0.3 + 0.2 * Math.sin(nodes[i].pulse)
        ctx.beginPath()
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100,180,255,${alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
}

// Main Dashboard Layout Component
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState(4)
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.07 0.02 270)' }}>
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'oklch(0.55 0.25 260)', animation: 'blobDrift 12s ease-in-out infinite alternate' }}
        />
        <div
          className="absolute top-1/2 -right-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'oklch(0.55 0.28 310)', animation: 'blobDrift 15s ease-in-out infinite alternate-reverse' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: 'oklch(0.65 0.2 195)', animation: 'blobDrift 18s ease-in-out infinite alternate' }}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blobDrift {
          0% { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px, 20px) scale(1.1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .active-nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          border-radius: 0 2px 2px 0;
          background: linear-gradient(to bottom, oklch(0.75 0.15 195), oklch(0.7 0.2 250));
          box-shadow: 0 0 8px oklch(0.75 0.15 195 / 0.8);
        }
        .sidebar-link {
          position: relative;
          transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        .sidebar-link:hover {
          transform: translateX(4px);
        }
        .glass-card {
          background: oklch(0.12 0.025 270 / 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid oklch(0.3 0.05 270 / 0.4);
        }
        .topbar-glass {
          background: oklch(0.08 0.02 270 / 0.85);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid oklch(0.25 0.05 270 / 0.6);
        }
      `}</style>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : undefined }}
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 flex flex-col glass-card transition-transform duration-300 lg:translate-x-0 overflow-hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <NeuralNetBg />

        {/* Logo */}
        <div className="relative z-10 p-5 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(100,180,255,0.3)' }}>
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-base tracking-tight" style={{
              fontFamily: "'Syne', sans-serif",
              background: 'linear-gradient(90deg, oklch(0.9 0.05 200), oklch(0.8 0.2 250), oklch(0.75 0.25 300))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              NEXUS<span style={{ WebkitTextFillColor: 'oklch(0.75 0.15 195)' }}>.AI</span>
            </div>
            <div className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'oklch(0.55 0.05 270)' }}>
              Neural Dashboard
            </div>
          </div>
          <button
            className="lg:hidden ml-auto p-1 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" style={{ color: 'oklch(0.65 0 0)' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
          {userGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-2 text-[10px] font-bold tracking-[0.2em]"
                style={{ color: 'oklch(0.4 0.05 270)' }}>
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.links.map((link) => {
                  const isActive = pathname === link.href ||
                    (link.href.length > 10 && pathname.startsWith(link.href))
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                        isActive
                          ? 'active-nav-item text-white'
                          : 'text-[oklch(0.55_0_0)] hover:text-white'
                      )}
                      style={isActive ? {
                        background: 'linear-gradient(135deg, oklch(0.7 0.2 250 / 0.15), oklch(0.75 0.15 195 / 0.08))',
                        boxShadow: 'inset 0 0 0 1px oklch(0.7 0.2 250 / 0.2)',
                      } : {}}
                    >
                      <link.icon className={cn(
                        'w-4 h-4 flex-shrink-0',
                        isActive ? 'text-[oklch(0.75_0.15_195)]' : ''
                      )} />
                      <span className="flex-1 text-[13px]">{link.label}</span>
                      {link.isNew && (
                        <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-full"
                          style={{ background: 'oklch(0.55 0.25 195 / 0.2)', color: 'oklch(0.75 0.15 195)', border: '1px solid oklch(0.75 0.15 195 / 0.3)' }}>
                          NEW
                        </span>
                      )}
                      {link.badge && !link.isNew && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                          style={{
                            background: 'oklch(0.7 0.2 250 / 0.2)',
                            color: 'oklch(0.8 0.15 250)',
                            border: '1px solid oklch(0.7 0.2 250 / 0.3)',
                          }}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="relative z-10 p-3 border-t border-white/5 space-y-0.5">
          <Link
            href="/help"
            className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[oklch(0.55_0_0)] hover:text-white"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[13px]">Support</span>
          </Link>
          <Link
            href="/docs"
            className="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[oklch(0.55_0_0)] hover:text-white"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[13px]">Documentation</span>
          </Link>
          <button className="sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[oklch(0.55_0_0)] hover:text-red-400 hover:bg-red-500/5 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-[13px]">Disconnect</span>
          </button>
        </div>

        <div className="relative z-10 px-5 pb-4 text-[10px] tracking-wider" style={{ color: 'oklch(0.35 0.03 270)' }}>
          NEXUS v2.4.0 · MAINNET
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <div className="lg:pl-64 relative z-10">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 topbar-glass">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" style={{ color: 'oklch(0.7 0 0)' }} />
            </button>

            <div className="hidden lg:flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" style={{ color: 'oklch(0.7 0.2 250)' }} />
              <span style={{ color: 'oklch(0.45 0.03 270)', fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.08em' }}>
                NEURAL DASHBOARD
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'oklch(0.5 0.2 150 / 0.1)', border: '1px solid oklch(0.5 0.2 150 / 0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px oklch(0.7 0.2 150)', animation: 'glowPulse 2s ease-in-out infinite' }} />
                <span className="text-[10px] font-bold tracking-widest" style={{ color: 'oklch(0.7 0.2 150)' }}>LIVE</span>
              </div>

              <button
                className="relative p-2 rounded-lg transition-all hover:bg-white/5"
                onClick={() => setNotifications(0)}
              >
                <Bell className="w-4.5 h-4.5" style={{ color: notifications > 0 ? 'oklch(0.8 0.15 250)' : 'oklch(0.5 0 0)' }} />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: 'oklch(0.65 0.25 25)', boxShadow: '0 0 8px oklch(0.65 0.25 25 / 0.6)' }}
                  >
                    {notifications}
                  </motion.span>
                )}
              </button>

              <ConnectButton.Custom>
                {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
                  const ready = mounted
                  const connected = ready && account && chain
                  return (
                    <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
                      {connected ? (
                        <button
                          onClick={openAccountModal}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
                          style={{
                            background: 'oklch(0.12 0.025 270)',
                            border: '1px solid oklch(0.7 0.2 250 / 0.3)',
                            color: 'oklch(0.85 0.1 250)',
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '11px',
                            boxShadow: '0 0 12px oklch(0.7 0.2 250 / 0.15)',
                          }}
                        >
                          <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
                          {account.displayName}
                        </button>
                      ) : (
                        <button
                          onClick={openConnectModal}
                          className="px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all hover:scale-[1.03] hover:shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, oklch(0.7 0.2 250), oklch(0.6 0.25 300))',
                            color: 'white',
                            boxShadow: '0 0 20px oklch(0.7 0.2 250 / 0.3)',
                          }}
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </div>
          </div>

          <div className="h-px w-full" style={{
            background: 'linear-gradient(90deg, transparent, oklch(0.7 0.2 250 / 0.4), oklch(0.75 0.15 195 / 0.4), transparent)',
            backgroundSize: '200% 100%',
            animation: 'borderFlow 4s linear infinite',
          }} />
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
          <motion.div
            key={pathname}
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}