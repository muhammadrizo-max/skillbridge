'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Trash2 } from 'lucide-react'
import { Avatar, LoadingSpinner } from '@/components/ui'
import { adminService } from '@/lib/services'
import { formatDate } from '@/lib/utils'
import type { Rating } from '@/lib/types'

export default function AdminRatingsPage() {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setRatings(await adminService.getRatings()); setLoading(false) })() }, [])
  const remove = async (id: string) => { await adminService.deleteRating(id); setRatings((p) => p.filter((r) => r.id !== id)) }
  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="font-display text-3xl mb-2">Baholar</h1></motion.div>
      <div className="card-base overflow-hidden"><table className="w-full">
        <thead><tr className="border-b bg-surface-50">{['Baholovchi','Baholangan','Baho','Sharh','Sana',''].map((h) => <th key={h} className="text-left px-6 py-3 text-xs font-medium text-surface-500 uppercase">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-surface-100">{ratings.map((r) => (
          <tr key={r.id} className="hover:bg-surface-50">
            <td className="px-6 py-4"><div className="flex items-center gap-2"><Avatar src={r.rater?.avatar} name={r.rater?.fullName || ''} size="sm" /><span className="text-sm">{r.rater?.fullName}</span></div></td>
            <td className="px-6 py-4"><div className="flex items-center gap-2"><Avatar src={r.rated?.avatar} name={r.rated?.fullName || ''} size="sm" /><span className="text-sm">{r.rated?.fullName}</span></div></td>
            <td className="px-6 py-4"><div className="flex gap-0.5">{Array.from({length:5}).map((_,i) => <Star key={i} className={`w-3.5 h-3.5 ${i<r.score?'text-amber-400 fill-amber-400':'text-surface-200'}`} />)}</div></td>
            <td className="px-6 py-4 text-sm text-surface-600 max-w-xs truncate">{r.review}</td>
            <td className="px-6 py-4 text-sm text-surface-500">{formatDate(r.createdAt)}</td>
            <td className="px-6 py-4 text-right"><button onClick={() => remove(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  )
}
