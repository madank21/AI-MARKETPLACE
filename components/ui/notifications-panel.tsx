'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

const notifications = [
  {
    id: 1,
    title: 'New AI Model Uploaded',
    description: 'HyperVision 4K was added to the marketplace.',
    type: 'success',
  },
  {
    id: 2,
    title: 'Revenue Milestone',
    description: 'You earned $1,240 this week.',
    type: 'info',
  },
  {
    id: 3,
    title: 'Security Alert',
    description: 'New wallet login detected.',
    type: 'warning',
  },
]

export function NotificationsPanel({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.25 }}
            className="fixed right-6 top-24 z-50 w-[420px] max-w-[95vw]"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(168,85,247,0.25)]">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bell className="w-6 h-6 text-cyan-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
                  </div>

                  <div>
                    <h2 className="font-black text-xl">
                      Notifications
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      AI Marketplace Updates
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Notifications */}
              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {notifications.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-cyan-400/30 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {item.type === 'success' && (
                          <CheckCircle2 className="text-emerald-400" />
                        )}

                        {item.type === 'warning' && (
                          <AlertTriangle className="text-yellow-400" />
                        )}

                        {item.type === 'info' && (
                          <Sparkles className="text-cyan-400" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold mb-1">
                          {item.title}
                        </h4>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}