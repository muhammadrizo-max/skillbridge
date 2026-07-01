'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flag, CheckCircle } from 'lucide-react'
import { Avatar, Badge, Button, LoadingSpinner, EmptyState } from '@/components/ui'
import { adminService } from '@/lib/services'
import { formatRelativeTime } from '@/lib/utils'
import type { Report } from '@/lib/types'

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setReports(await adminService.getReports()); setLoading(false) })() }, [])

  const resolve = async (id: string) => { setReports((p) => p.map((r) => r.id === id ? { ...r, status: 'hal qilindi' as const } : r)) }
  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="font-display text-3xl mb-2">Hisobotlar</h1></motion.div>
      {reports.length > 0 ? <div className="space-y-4">{reports.map((r, i) => (
        <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-base p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2"><Flag className="w-4 h-4 text-red-500" /><span className="font-medium">{r.reason}</span><Badge variant={r.status === "ko'rib chiqilmoqda" ? 'warning' : 'success'}>{r.status}</Badge></div>
            <span className="text-xs text-surface-400">{formatRelativeTime(r.createdAt)}</span>
          </div>
          <p className="text-sm text-surface-600 mb-4">{r.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm"><div className="flex items-center gap-2"><span className="text-surface-500">Hisobotchi:</span><Avatar src={r.reporter?.avatar} name={r.reporter?.fullName || ''} size="sm" /><span>{r.reporter?.fullName}</span></div><div className="flex items-center gap-2"><span className="text-surface-500">Shikoyat:</span><Avatar src={r.reported?.avatar} name={r.reported?.fullName || ''} size="sm" /><span>{r.reported?.fullName}</span></div></div>
            {r.status === "ko'rib chiqilmoqda" && <Button size="sm" onClick={() => resolve(r.id)}><CheckCircle className="w-4 h-4" /> Hal qilindi</Button>}
          </div>
        </motion.div>
      ))}</div> : <EmptyState icon={<Flag className="w-16 h-16" />} title="Hisobotlar yo'q" />}
    </div>
  )
}