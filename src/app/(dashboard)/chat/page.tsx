'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Avatar, Badge, LoadingSpinner, EmptyState } from '@/components/ui'
import { chatService } from '@/lib/services'
import { formatRelativeTime } from '@/lib/utils'
import type { ChatConversation } from '@/lib/types'

export default function ChatListPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setConversations(await chatService.getConversations()); setLoading(false) })() }, [])

  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="section-title mb-2">Xabarlar</h1><p className="text-surface-500">Barcha suhbatlaringiz.</p></motion.div>
      {conversations.length > 0 ? <div className="space-y-3">{conversations.map((c, i) => (
        <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Link href={`/chat/${c.connectionId}`} className="card-base p-5 flex items-center gap-4 block">
            <Avatar src={c.otherUser.avatar} name={c.otherUser.fullName} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1"><span className="font-medium">{c.otherUser.fullName}</span><span className="text-xs text-surface-400">{formatRelativeTime(c.lastMessage.timestamp)}</span></div>
              <p className="text-sm text-surface-500 truncate">{c.lastMessage.content}</p>
            </div>
            {c.unreadCount > 0 && <Badge variant="primary">{c.unreadCount}</Badge>}
          </Link>
        </motion.div>
      ))}</div> : <EmptyState icon={<MessageCircle className="w-16 h-16" />} title="Suhbatlar yo'q" />}
    </div>
  )
}