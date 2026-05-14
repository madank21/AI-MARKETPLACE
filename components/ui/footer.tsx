'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { GradientText } from './gradient-text'
import { Sparkles, Github, Twitter, MessageCircle, Mail } from 'lucide-react'
import { Input } from './input'
import { Button } from './button'

const footerLinks = {
  Platform: [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/explore', label: 'Explore Models' },
    { href: '/creators', label: 'Top Creators' },
    { href: '/compute', label: 'Compute Network' },
    { href: '/staking', label: 'Staking' },
  ],
  Resources: [
    { href: '/docs', label: 'Documentation' },
    { href: '/api', label: 'API Reference' },
    { href: '/tutorials', label: 'Tutorials' },
    { href: '/blog', label: 'Blog' },
    { href: '/changelog', label: 'Changelog' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press Kit' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
}

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://discord.com', icon: MessageCircle, label: 'Discord' },
]

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('relative border-t border-border/50 bg-card/30', className)}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">
                  <GradientText variant="blue-cyan">NexusAI</GradientText>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">
                The next-generation decentralized marketplace for AI models. 
                Deploy, monetize, and discover cutting-edge AI with blockchain-powered ownership.
              </p>

              {/* Newsletter */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Subscribe to our newsletter</p>
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-muted/50 border-border/50"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
                    <Mail className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-sm mb-4">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NexusAI. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
