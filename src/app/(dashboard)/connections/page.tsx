'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { LoadingSpinner, Tabs, EmptyState } from '@/components/ui'
import { ConnectionCard } from '@/components/domain'
import { connectionService } from '@/lib/services'
import { useUIStore } from '@/lib/stores'
import type { Connection } from '@/lib/types'

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('all')
  const { addToast } = useUIStore()

  useEffect(() => { (async () => { setConnections(await connectionService.getConnections()); setLoading(false) })() }, [])

  const incoming = connections.filter((c) => c.status === 'pending' && c.receiverId === '1')
  const outgoing = connections.filter((c) => c.status === 'pending' && c.senderId === '1')
  const active = connections.filter((c) => c.status === 'accepted')
  const filtered = tab === 'incoming' ? incoming : tab === 'outgoing' ? outgoing : tab === 'active' ? active : connections

  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="section-title mb-2">Ulanishlar</h1><p className="text-surface-500">Barcha ulanish so'rovlari va faol hamkorlar.</p></motion.div>
      <Tabs tabs={[{ id: 'all', label: 'Barchasi', count: connections.length }, { id: 'incoming', label: 'Kiruvchi', count: incoming.length }, { id: 'outgoing', label: 'Chiquvchi', count: outgoing.length }, { id: 'active', label: 'Faol', count: active.length }]} onChange={setTab}>
        {filtered.length > 0 ? <div className="space-y-4">{filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <ConnectionCard connection={c} type={c.senderId === '1' ? 'outgoing' : 'incoming'}
              onAccept={async () => { await connectionService.acceptRequest(c.id); setConnections((p) => p.map((x) => x.id === c.id ? { ...x, status: 'accepted' as const } : x)); addToast({ type: 'success', message: "Qabul qilindi!" }) }}
              onReject={async () => { await connectionService.rejectRequest(c.id); setConnections((p) => p.map((x) => x.id === c.id ? { ...x, status: 'rejected' as const } : x)); addToast({ type: 'info', message: "Rad etildi" }) }}
            />
          </motion.div>
        ))}</div> : <EmptyState icon={<Users className="w-16 h-16" />} title="Ulanishlar yo'q" />}
      </Tabs>
    </div>
  )
}