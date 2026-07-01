'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Avatar, Badge, LoadingSpinner } from '@/components/ui'
import { adminService } from '@/lib/services'
import { formatDate } from '@/lib/utils'
import type { Connection } from '@/lib/types'

const statusMap: Record<string, { label: string; variant: 'warning'|'success'|'danger'|'default' }> = {
  pending: { label: 'Kutilmoqda', variant: 'warning' },
  accepted: { label: 'Qabul qilindi', variant: 'success' },
  rejected: { label: 'Rad etildi', variant: 'danger' },
  cancelled: { label: 'Bekor qilindi', variant: 'default' },
}

export default function AdminConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setConnections(await adminService.getConnections()); setLoading(false) })() }, [])
  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="font-display text-3xl mb-2">Ulanishlar</h1></motion.div>
      <div className="card-base overflow-hidden"><table className="w-full">
        <thead><tr className="border-b bg-surface-50">{['Yuboruvchi','Qabul qiluvchi','Holat','Sana'].map((h) => <th key={h} className="text-left px-6 py-3 text-xs font-medium text-surface-500 uppercase">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-surface-100">{connections.map((c) => (
          <tr key={c.id} className="hover:bg-surface-50">
            <td className="px-6 py-4"><div className="flex items-center gap-2"><Avatar src={c.sender?.avatar} name={c.sender?.fullName || ''} size="sm" /><span className="text-sm">{c.sender?.fullName}</span></div></td>
            <td className="px-6 py-4"><div className="flex items-center gap-2"><Avatar src={c.receiver?.avatar} name={c.receiver?.fullName || ''} size="sm" /><span className="text-sm">{c.receiver?.fullName}</span></div></td>
            <td className="px-6 py-4"><Badge variant={statusMap[c.status].variant}>{statusMap[c.status].label}</Badge></td>
            <td className="px-6 py-4 text-sm text-surface-500">{formatDate(c.createdAt)}</td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  )
}