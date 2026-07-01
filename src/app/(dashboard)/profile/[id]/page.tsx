'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Star, BookOpen, Languages as LangIcon, Flag } from 'lucide-react'
import { Button, Badge, Avatar, Card, LoadingSpinner, Tabs } from '@/components/ui'
import { SkillBadge, RatingCard } from '@/components/domain'
import { userService, ratingService } from '@/lib/services'
import { mockTeachingSkills, mockLearningSkills } from '@/lib/mock'
import { formatDate } from '@/lib/utils'
import { useUIStore } from '@/lib/stores'
import type { User, Rating } from '@/lib/types'

export default function UserProfilePage() {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('skills')
  const { addToast } = useUIStore()

  useEffect(() => { (async () => { try { setUser(await userService.getProfile(params.id as string)); setRatings(await ratingService.getRatingsForUser(params.id as string)) } finally { setLoading(false) } })() }, [params.id])

  if (loading) return <LoadingSpinner size="lg" className="py-32" />
  if (!user) return <p className="text-center py-20 text-surface-500">Foydalanuvchi topilmadi</p>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-base p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Avatar src={user.avatar} name={user.fullName} size="xl" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div><h1 className="font-display text-2xl">{user.fullName}</h1><p className="text-surface-500">@{user.username}</p></div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => addToast({ type: 'success', message: "Ulanish so'rovi yuborildi!" })}>Ulanish so'rash</Button>
                <Button variant="ghost" size="sm"><Flag className="w-4 h-4" /></Button>
              </div>
            </div>
            <p className="text-surface-600 mb-4">{user.bio}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{user.city}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(user.joinDate)}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{user.rating.toFixed(1)}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{user.completedSessions} seans</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">{user.languages.map((l) => <Badge key={l}><LangIcon className="w-3 h-3 mr-1" />{l}</Badge>)}</div>
          </div>
        </div>
      </motion.div>

      <Tabs tabs={[{ id: 'skills', label: "Ko'nikmalar" }, { id: 'ratings', label: 'Baholar', count: ratings.length }]} onChange={setTab}>
        {tab === 'skills' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card><h3 className="font-display text-lg mb-4 text-primary-700">O'rgatadi</h3><div className="flex flex-wrap gap-2">{mockTeachingSkills.map((s) => <SkillBadge key={s.id} skill={s.skill} level={s.level} variant="teach" />)}</div></Card>
          <Card><h3 className="font-display text-lg mb-4 text-accent-500">O'rganmoqchi</h3><div className="flex flex-wrap gap-2">{mockLearningSkills.map((s) => <SkillBadge key={s.id} skill={s.skill} variant="learn" />)}</div></Card>
        </motion.div>}
        {tab === 'ratings' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {ratings.length > 0 ? ratings.map((r) => <RatingCard key={r.id} rating={r} />) : <Card className="text-center py-12"><p className="text-surface-500">Baholar yo'q</p></Card>}
        </motion.div>}
      </Tabs>
    </div>
  )
}