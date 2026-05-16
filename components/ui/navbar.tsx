'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { GradientText } from './gradient-text'
import { RobohashAvatar } from '@/components/ui/robohash-avatar'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  Store,
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  User,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { AISearch } from './ai-search'
import { NotificationsPanel } from './notifications-panel'
import { useUser, UserButton } from '@clerk/nextjs'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/explore', label: 'Explore', icon: Search },
  { href: '/creator', label: 'Creators', icon: Users },
  { href: '/docs', label: 'Docs', icon: BookOpen },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { user, isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5',
          isScrolled && 'shadow-xl shadow-primary/10'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group p-1 rounded-xl hover:bg-muted/50 transition-all">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-secondary shadow-xl overflow-hidden group-hover:scale-110 transition-all">
                <Sparkles className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent animate-pulse opacity-70" />
              </div>
              <GradientText variant="blue-cyan" className="font-black text-xl hidden sm:block tracking-tight">
                NexusAI
              </GradientText>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-semibold relative group transition-all duration-300 hover:shadow-md',
                    pathname === item.href
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-lg shadow-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <item.icon className="w-4 h-4 mr-1.5 inline group-hover:rotate-12 transition-transform" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSearchOpen(true)}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-cyan-500/10 hover:border-cyan-400/40"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setNotificationsOpen(true)}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-purple-500/10 hover:border-purple-400/40"
              >
                <motion.span 
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-xs rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-background"
                  layoutId="notification"
                  //animate={{ scale: [1, 1.05, 1] }}
                  //transition={{ repeat: Infinity, duration: 2 }}
                >
                  3
                </motion.span>
                <Bell className="w-5 h-5" />
              </Button>

              {/* Auth + Wallet Section */}
              <div className="hidden sm:flex items-center gap-3">
                {/* Clerk Authenticated User */}
                {isLoaded && isSignedIn ? (
                  <div className="flex items-center gap-3">
                    
                    
                    {/* Clerk User Button */}
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                        }
                      }}
                    >
                      <UserButton.MenuItems>
                        <UserButton.Link
                          label="Dashboard"
                          labelIcon={<LayoutDashboard className="w-4 h-4" />}
                          href="/dashboard"
                        />
                        <UserButton.Link
                          label="Profile"
                          labelIcon={<User className="w-4 h-4" />}
                          href="/profile"
                        />
                        <UserButton.Link
                          label="Settings"
                          labelIcon={<Settings className="w-4 h-4" />}
                          href="/settings"
                        />
                      </UserButton.MenuItems>
                    </UserButton>
                  </div>
                ) : (
                  // Not authenticated - Show Login button + Wallet
                  <>
                    <Link href="/auth/login">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          variant="ghost"
                          className="h-11 px-6 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_30px_rgba(59,130,246,0.35)] border border-cyan-400/20"
                        >
                          Login
                        </Button>
                      </motion.div>
                    </Link>

                    {/* Wallet Connect */}
                    <ConnectButton.Custom>
                      {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        mounted,
                      }) => {
                        const ready = mounted
                        const connected = ready && account && chain

                        if (!ready) {
                          return (
                            <div className="h-11 w-32 rounded-2xl bg-white/5 animate-pulse" />
                          )
                        }

                        if (!connected) {
                          return (
                            <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <Button
                                onClick={openConnectModal}
                                className="h-11 px-6 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                              >
                                Connect Wallet
                              </Button>
                            </motion.div>
                          )
                        }

                        if (chain.unsupported) {
                          return (
                            <Button
                              onClick={openChainModal}
                              variant="destructive"
                              className="h-11 rounded-2xl font-bold"
                            >
                              Wrong Network
                            </Button>
                          )
                        }

                        return (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 p-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/40 transition-all cursor-pointer"
                              >
                                <RobohashAvatar
                                  name={account.displayName}
                                  size={42}
                                  className="ring-2 ring-cyan-400/30"
                                />
                                <div className="hidden lg:block">
                                  <p className="text-sm font-bold max-w-[120px] truncate">
                                    {account.displayName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {chain.name}
                                  </p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              </motion.div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-80 p-3 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl"
                            >
                              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-3">
                                <div className="flex items-center gap-4">
                                  <RobohashAvatar
                                    name={account.displayName}
                                    size={56}
                                  />
                                  <div className="min-w-0">
                                    <p className="font-black truncate">
                                      {account.displayName}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {account.address}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <DropdownMenuItem asChild>
                                <Link
                                  href="/dashboard"
                                  className="flex items-center gap-3 rounded-xl p-3 cursor-pointer"
                                >
                                  <LayoutDashboard className="w-5 h-5 text-cyan-400" />
                                  Dashboard
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem asChild>
                                <Link
                                  href="/settings"
                                  className="flex items-center gap-3 rounded-xl p-3 cursor-pointer"
                                >
                                  <Settings className="w-5 h-5 text-purple-400" />
                                  Settings
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={openChainModal}
                                className="rounded-xl p-3 cursor-pointer"
                              >
                                Switch Network
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={openAccountModal}
                                className="rounded-xl p-3 cursor-pointer text-red-400"
                              >
                                <LogOut className="w-4 h-4 mr-2" />
                                Disconnect Wallet
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )
                      }}
                    </ConnectButton.Custom>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden p-1.5 hover:bg-muted/50 rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mt-20 p-6 rounded-3xl mx-4 bg-card/90 backdrop-blur-2xl shadow-2xl border border-border/50"
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-2xl text-lg font-semibold transition-all group hover:shadow-xl',
                        pathname === item.href
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-lg shadow-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      <item.icon className="w-6 h-6 shrink-0 group-hover:rotate-12 transition-transform" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-6 border-t border-border/50 space-y-4"
                >
                  {isLoaded && isSignedIn && user ? (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                          <img 
                            src={user.imageUrl} 
                            alt={user.fullName || 'User'} 
                            className="w-12 h-12 rounded-full ring-2 ring-primary/20"
                          />
                        
                        <div>
                          <p className="font-semibold">
                            {user.fullName || user.username || 'User'}
                          </p>
                          {/* <p className="text-sm text-muted-foreground">
                            {user.primaryEmailAddress?.emailAddress || 
                             (user.primaryWeb3Wallet?.web3Wallet 
                               ? `${user.primaryWeb3Wallet.web3Wallet.slice(0, 6)}...${user.primaryWeb3Wallet.web3Wallet.slice(-4)}`
                               : '')}
                          </p> */}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <UserButton />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full h-12 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600">
                          Login
                        </Button>
                      </Link>
                      <ConnectButton />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />

      {/* Search Modal */}
      <AISearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  )
}