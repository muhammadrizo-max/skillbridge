'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Users, Search, Star, MessageCircle, ArrowRight, Check, X, Sparkles, Clock, TrendingUp } from 'lucide-react'
import { Card, Button, Avatar, Badge, LoadingSpinner } from '@/components/ui'
import { useAuthStore } from '@/lib/stores'
import { mockConnections, mockConversations, mockNotifications, ROUTES } from '@/lib/mock'
import { formatRelativeTime } from '@/lib/utils'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t) }, [])
  if (loading || !user) return <LoadingSpinner size="lg" className="py-32" />

  const active = mockConnections.filter((c) => c.status === 'accepted')
  const pending = mockConnections.filter((c) => c.status === 'pending' && c.receiverId === user.id)

  /* Profil to'ldirilishi */
  const steps = [
    { done: true, label: 'Hisob yaratildi' },
    { done: true, label: 'Email tasdiqlandi' },
    { done: !!user.bio, label: 'Bio yozildi' },
    { done: !!user.city, label: 'Shahar tanlandi' },
    { done: user.languages.length > 0, label: 'Tillar qo\'shildi' },
    { done: false, label: 'O\'rgatish ko\'nikmasi' },
    { done: false, label: 'O\'rganish ko\'nikmasi' },
    { done: active.length > 0, label: 'Birinchi ulanish' },
    { done: user.completedSessions > 0, label: 'Birinchi seans' },
    { done: user.ratingCount > 0, label: 'Birinchi baho' },
  ]
  const doneCount = steps.filter((s) => s.done).length
  const progress = Math.round((doneCount / steps.length) * 100)

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Salomlashish */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl text-surface-900 mb-1">
          Assalomu alaykum, {user.fullName.split(' ')[0]}!
        </h1>
        <p className="text-surface-400 text-sm">Bugun nima o&apos;rganmoqchisiz?</p>
      </motion.div>

      {/* Profil progress + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-base text-surface-900">Profil to&apos;ldirilishi</h3>
                <p className="text-xs text-surface-400 mt-0.5">{doneCount}/{steps.length} qadam bajarildi</p>
              </div>
              <span className="text-2xl font-display text-primary-700">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-surface-100 rounded-full mb-4 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ delay: 0.3, duration: 0.8 }} className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-green-100 text-green-600' : 'bg-surface-100 text-surface-300'}`}>
                    {s.done ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                  </div>
                  <span className={s.done ? 'text-surface-500 line-through' : 'text-surface-600'}>{s.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Stat cards */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          {[
            { label: 'Ulanishlar', value: active.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
            { label: 'Seanslar', value: user.completedSessions, icon: BookOpen, color: 'bg-green-50 text-green-600' },
            { label: 'Reyting', value: user.rating.toFixed(1), icon: Star, color: 'bg-amber-50 text-amber-600' },
          ].map((s) => (
            <Card key={s.label} padding="sm" className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}><s.icon className="w-4 h-4" /></div>
              <div><p className="font-display text-lg text-surface-900">{s.value}</p><p className="text-[11px] text-surface-400">{s.label}</p></div>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Tezkor harakatlar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Search, label: 'Qidirish', href: ROUTES.search, color: 'bg-blue-50 text-blue-600' },
            { icon: Sparkles, label: 'Moslash', href: ROUTES.matching, color: 'bg-green-50 text-green-600' },
            { icon: MessageCircle, label: 'Xabarlar', href: ROUTES.chat, color: 'bg-purple-50 text-purple-600' },
            { icon: BookOpen, label: 'Ko\'nikmalar', href: ROUTES.profile, color: 'bg-amber-50 text-amber-600' },
          ].map((a) => (
            <Link key={a.label} href={a.href}>
              <div className="card-base p-4 text-center group hover:border-primary-200 transition-all cursor-pointer">
                <div className={`w-10 h-10 rounded-lg ${a.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}><a.icon className="w-5 h-5" /></div>
                <span className="text-xs font-medium text-surface-600">{a.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* So'nggi suhbatlar + Bildirishnomalar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm text-surface-900">So&apos;nggi suhbatlar</h3>
              <Link href={ROUTES.chat} className="text-xs text-primary-700 hover:underline flex items-center gap-1">Barchasi <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-1">
              {mockConversations.map((c) => (
                <Link key={c.id} href={`/chat/${c.connectionId}`} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-50 transition-colors">
                  <Avatar src={c.otherUser.avatar} name={c.otherUser.fullName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between"><span className="text-sm font-medium text-surface-800">{c.otherUser.fullName}</span><span className="text-[10px] text-surface-400">{formatRelativeTime(c.lastMessage.timestamp)}</span></div>
                    <p className="text-xs text-surface-400 truncate">{c.lastMessage.content}</p>
                  </div>
                  {c.unreadCount > 0 && <span className="w-5 h-5 bg-primary-700 text-white text-[10px] rounded-full flex items-center justify-center flex-shrink-0">{c.unreadCount}</span>}
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-4">
          {/* So'rovlar */}
          {pending.length > 0 && (
            <Card>
              <h3 className="font-display text-sm text-surface-900 mb-3">Yangi so&apos;rovlar</h3>
              <div className="space-y-2">
                {pending.map((r) => (
                  <div key={r.id} className="flex items-center gap-3">
                    <Avatar src={r.sender?.avatar} name={r.sender?.fullName || ''} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-800 truncate">{r.sender?.fullName}</p>
                      <p className="text-[11px] text-surface-400">{r.sender?.city}</p>
                    </div>
                    <Link href={ROUTES.connections}><Button size="sm" variant="ghost">Ko&apos;rish</Button></Link>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Bildirishnomalar */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm text-surface-900">Bildirishnomalar</h3>
              {mockNotifications.filter((n) => !n.isRead).length > 0 && <Badge variant="danger">{mockNotifications.filter((n) => !n.isRead).length}</Badge>}
            </div>
            <div className="space-y-2">
              {mockNotifications.slice(0, 3).map((n) => (
                <div key={n.id} className="flex items-start gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${n.isRead ? 'bg-surface-200' : 'bg-primary-500'}`} />
                  <div className="flex-1 min-w-0"><p className="text-xs text-surface-600 line-clamp-2">{n.message}</p><p className="text-[10px] text-surface-400 mt-0.5">{formatRelativeTime(n.createdAt)}</p></div>
                </div>
              ))}
            </div>
            <Link href={ROUTES.notifications} className="block text-center text-xs text-primary-700 hover:underline mt-3">Barchasini ko&apos;rish</Link>
          </Card>

          {/* Maslahat */}
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4 border border-primary-100">
            <div className="flex items-center gap-2 mb-1.5"><TrendingUp className="w-3.5 h-3.5 text-primary-700" /><span className="text-xs font-medium text-primary-800">Maslahat</span></div>
            <p className="text-xs text-primary-700/70 leading-relaxed">Profilingizni to&apos;liq to&apos;ldiring — ko&apos;proq moslash natijalarini olishga yordam beradi!</p>
            <Link href={ROUTES.profileEdit} className="inline-block mt-2 text-xs font-medium text-primary-700 hover:underline">Profilni tahrirlash →</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
