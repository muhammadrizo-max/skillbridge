'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Users, Search, Star, MessageCircle, TrendingUp, ArrowRight, Clock } from 'lucide-react'
import { Card, Button, Badge, Avatar, LoadingSpinner } from '@/components/ui'
import { useAuthStore } from '@/lib/stores'
import { mockConnections, mockConversations, mockNotifications, ROUTES } from '@/lib/mock'
import { formatRelativeTime } from '@/lib/utils'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t) }, [])
  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  const activeConnections = mockConnections.filter((c) => c.status === 'accepted')
  const pendingRequests = mockConnections.filter((c) => c.status === 'pending' && c.receiverId === user?.id)

  const quickActions = [
    { icon: Search, label: 'Qidirish', href: ROUTES.search, color: 'bg-blue-50 text-blue-600' },
    { icon: Users, label: 'Moslash', href: ROUTES.matching, color: 'bg-green-50 text-green-600' },
    { icon: MessageCircle, label: 'Chat', href: ROUTES.chat, color: 'bg-purple-50 text-purple-600' },
    { icon: BookOpen, label: 'Profilim', href: ROUTES.profile, color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-surface-900 mb-2">Assalomu alaykum, {user?.fullName?.split(' ')[0]}!</h1>
        <p className="text-surface-500">Bugun nima o'rganmoqchisiz?</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((a) => (
          <Link key={a.label} href={a.href}><Card className="text-center group">
            <div className={`w-12 h-12 rounded-xl ${a.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}><a.icon className="w-6 h-6" /></div>
            <span className="text-sm font-medium text-surface-700">{a.label}</span>
          </Card></Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Ulanishlar', value: activeConnections.length, icon: Users },
              { label: "So'rovlar", value: pendingRequests.length, icon: Clock },
              { label: 'Seanslar', value: user?.completedSessions || 0, icon: BookOpen },
              { label: 'Reyting', value: user?.rating?.toFixed(1) || '0', icon: Star },
            ].map((s) => (
              <Card key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0"><s.icon className="w-5 h-5 text-primary-700" /></div>
                <div><p className="font-display text-xl text-surface-900">{s.value}</p><p className="text-xs text-surface-500">{s.label}</p></div>
              </Card>
            ))}
          </div>
          <Card>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display text-lg">So'nggi suhbatlar</h3><Link href={ROUTES.chat} className="text-sm text-primary-700 hover:underline flex items-center gap-1">Barchasi <ArrowRight className="w-3.5 h-3.5" /></Link></div>
            <div className="space-y-3">
              {mockConversations.map((c) => (
                <Link key={c.id} href={`/chat/${c.connectionId}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors">
                  <Avatar src={c.otherUser.avatar} name={c.otherUser.fullName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between"><span className="font-medium text-sm">{c.otherUser.fullName}</span><span className="text-xs text-surface-400">{formatRelativeTime(c.lastMessage.timestamp)}</span></div>
                    <p className="text-xs text-surface-500 truncate">{c.lastMessage.content}</p>
                  </div>
                  {c.unreadCount > 0 && <span className="w-5 h-5 bg-primary-700 text-white text-[10px] rounded-full flex items-center justify-center">{c.unreadCount}</span>}
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          {pendingRequests.length > 0 && (
            <Card><h3 className="font-display text-lg mb-4">Yangi so'rovlar</h3><div className="space-y-3">
              {pendingRequests.map((r) => (<div key={r.id} className="flex items-center gap-3"><Avatar src={r.sender?.avatar} name={r.sender?.fullName || ''} size="sm" /><div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{r.sender?.fullName}</p><p className="text-xs text-surface-500">{r.sender?.city}</p></div><Link href={ROUTES.connections}><Button size="sm" variant="ghost">Ko'rish</Button></Link></div>))}
            </div></Card>
          )}
          <Card>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display text-lg">Bildirishnomalar</h3>{mockNotifications.filter((n) => !n.isRead).length > 0 && <Badge variant="danger">{mockNotifications.filter((n) => !n.isRead).length}</Badge>}</div>
            <div className="space-y-3">
              {mockNotifications.slice(0, 4).map((n) => (<div key={n.id} className="flex items-start gap-3"><div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.isRead ? 'bg-surface-300' : 'bg-primary-500'}`} /><div className="flex-1 min-w-0"><p className="text-sm text-surface-700 line-clamp-2">{n.message}</p><p className="text-xs text-surface-400 mt-0.5">{formatRelativeTime(n.createdAt)}</p></div></div>))}
            </div>
            <Link href={ROUTES.notifications} className="block text-center text-sm text-primary-700 hover:underline mt-4">Barchasini ko'rish</Link>
          </Card>
          <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-primary-100">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-primary-700" /><span className="text-sm font-medium text-primary-800">Maslahat</span></div>
            <p className="text-sm text-primary-700/80">Profilingizni to'liq to'ldiring — bu ko'proq moslash natijalarini olishga yordam beradi!</p>
            <Link href={ROUTES.profileEdit} className="inline-block mt-3 text-sm font-medium text-primary-700 hover:underline">Profilni tahrirlash →</Link>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}