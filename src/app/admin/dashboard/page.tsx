'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Link2, MessageCircle, Star, AlertTriangle, TrendingUp, UserPlus } from 'lucide-react'
import { Card, LoadingSpinner } from '@/components/ui'
import { adminService } from '@/lib/services'
import type { AdminStats } from '@/lib/types'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setStats(await adminService.getStats()); setLoading(false) })() }, [])
  if (loading || !stats) return <LoadingSpinner size="lg" className="py-32" />

  const cards = [
    { label: "Jami foydalanuvchilar", value: stats.totalUsers.toLocaleString(), icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Faol', value: stats.activeUsers.toLocaleString(), icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Bugun yangi', value: stats.newUsersToday, icon: UserPlus, color: 'bg-purple-50 text-purple-600' },
    { label: 'Ulanishlar', value: stats.totalConnections.toLocaleString(), icon: Link2, color: 'bg-amber-50 text-amber-600' },
    { label: 'Xabarlar', value: stats.totalMessages.toLocaleString(), icon: MessageCircle, color: 'bg-pink-50 text-pink-600' },
    { label: 'Baholar', value: stats.totalRatings.toLocaleString(), icon: Star, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Kutilayotgan hisobotlar', value: stats.pendingReports, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { label: 'Haftalik yangi', value: stats.newUsersThisWeek, icon: Users, color: 'bg-teal-50 text-teal-600' },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="font-display text-3xl mb-2">Boshqaruv paneli</h1><p className="text-surface-500">Platforma statistikasi.</p></motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}><Card><div className="flex items-center gap-4"><div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}><c.icon className="w-6 h-6" /></div><div><p className="font-display text-2xl">{c.value}</p><p className="text-xs text-surface-500">{c.label}</p></div></div></Card></motion.div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><Card><h3 className="font-display text-lg mb-4">Mashhur ko'nikmalar</h3><div className="space-y-3">
          {stats.topSkills.map((s, i) => <div key={s.name} className="flex items-center gap-3"><span className="text-xs text-surface-400 w-6">{i + 1}.</span><div className="flex-1"><div className="flex items-center justify-between mb-1"><span className="text-sm font-medium">{s.name}</span><span className="text-xs text-surface-500">{s.count}</span></div><div className="h-1.5 bg-surface-100 rounded-full overflow-hidden"><div className="h-full bg-primary-700 rounded-full" style={{ width: `${(s.count / stats.topSkills[0].count) * 100}%` }} /></div></div></div>)}
        </div></Card></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><Card><h3 className="font-display text-lg mb-4">Foydalanuvchilar o'sishi</h3><div className="flex items-end justify-between h-48 gap-2">
          {stats.userGrowth.map((g) => { const max = Math.max(...stats.userGrowth.map((x) => x.count)); return <div key={g.month} className="flex-1 flex flex-col items-center gap-2"><span className="text-[10px] text-surface-500">{g.count}</span><div className="w-full bg-surface-100 rounded-t-md relative" style={{ height: '160px' }}><motion.div initial={{ height: 0 }} animate={{ height: `${(g.count / max) * 100}%` }} transition={{ delay: 0.5, duration: 0.6 }} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-700 to-primary-500 rounded-t-md" /></div><span className="text-[10px] text-surface-500">{g.month}</span></div> })}
        </div></Card></motion.div>
      </div>
    </div>
  )
}