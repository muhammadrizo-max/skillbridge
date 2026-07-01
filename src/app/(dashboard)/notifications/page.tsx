'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Check, UserPlus, MessageCircle, Star } from 'lucide-react'
import { Button, Badge, EmptyState } from '@/components/ui'
import { mockNotifications } from '@/lib/mock'
import { formatRelativeTime } from '@/lib/utils'
import type { Notification } from '@/lib/types'
import Link from 'next/link'

const icons = { connection_request: UserPlus, new_message: MessageCircle, new_rating: Star, connection_accepted: Check }

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, isRead: true })))
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div><h1 className="section-title mb-2">Bildirishnomalar</h1><p className="text-surface-500">{unreadCount > 0 ? `${unreadCount} ta o'qilmagan` : 'Hammasi o\'qilgan'}</p></div>
        {unreadCount > 0 && <Button variant="ghost" size="sm" onClick={markAllRead}><Check className="w-4 h-4" /> Hammasini o'qish</Button>}
      </motion.div>
      {notifications.length > 0 ? <div className="space-y-2">{notifications.map((n, i) => {
        const Icon = icons[n.type]
        return <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Link href={n.link || '#'} className={`card-base p-4 flex items-start gap-4 block ${!n.isRead ? 'bg-primary-50/50 border-primary-100' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!n.isRead ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-surface-500'}`}><Icon className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0"><p className={`text-sm ${!n.isRead ? 'font-medium' : 'text-surface-600'}`}>{n.message}</p><p className="text-xs text-surface-400 mt-1">{formatRelativeTime(n.createdAt)}</p></div>
            {!n.isRead && <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />}
          </Link>
        </motion.div>
      })}</div> : <EmptyState icon={<Bell className="w-16 h-16" />} title="Bildirishnomalar yo'q" />}
    </div>
  )
}