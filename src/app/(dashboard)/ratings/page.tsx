'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { LoadingSpinner, EmptyState, Card } from '@/components/ui'
import { RatingCard } from '@/components/domain'
import { ratingService } from '@/lib/services'
import type { Rating } from '@/lib/types'

export default function RatingsPage() {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setRatings(await ratingService.getRatings()); setLoading(false) })() }, [])
  if (loading) return <LoadingSpinner size="lg" className="py-32" />
  const avg = ratings.length > 0 ? ratings.reduce((s, r) => s + r.score, 0) / ratings.length : 0

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="section-title mb-2">Baholar</h1><p className="text-surface-500">Sizga berilgan baholar.</p></motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><Card className="text-center">
        <div className="font-display text-5xl mb-2">{avg.toFixed(1)}</div>
        <div className="flex items-center justify-center gap-1 mb-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-surface-200'}`} />)}</div>
        <p className="text-sm text-surface-500">{ratings.length} ta baho</p>
      </Card></motion.div>
      {ratings.length > 0 ? <div className="space-y-4">{ratings.map((r, i) => <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}><RatingCard rating={r} /></motion.div>)}</div> : <EmptyState icon={<Star className="w-16 h-16" />} title="Baholar yo'q" />}
    </div>
  )
}