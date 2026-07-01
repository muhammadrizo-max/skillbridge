'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, RefreshCw } from 'lucide-react'
import { LoadingSpinner, Button, EmptyState } from '@/components/ui'
import { MatchCard } from '@/components/domain'
import { matchingService } from '@/lib/services'
import { useUIStore } from '@/lib/stores'
import type { MatchResult } from '@/lib/types'

export default function MatchingPage() {
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useUIStore()

  const loadMatches = async () => { setLoading(true); try { setMatches(await matchingService.getMatches()) } finally { setLoading(false) } }
  useEffect(() => { loadMatches() }, [])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div><h1 className="section-title flex items-center gap-3 mb-2"><Sparkles className="w-8 h-8 text-accent-400" /> Moslash</h1><p className="text-surface-500">Ko'nikmalaringiz asosida eng mos hamkorlar.</p></div>
        <Button variant="secondary" onClick={loadMatches} loading={loading}><RefreshCw className="w-4 h-4" /> Yangilash</Button>
      </motion.div>
      {loading ? <LoadingSpinner size="lg" className="py-16" /> : matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{matches.map((m, i) => <MatchCard key={m.user.id} match={m} index={i} onConnect={() => addToast({ type: 'success', message: "Ulanish so'rovi yuborildi!" })} />)}</div>
      ) : <EmptyState icon={<Sparkles className="w-16 h-16" />} title="Natija yo'q" description="Ko'proq ko'nikma qo'shing." />}
    </div>
  )
}