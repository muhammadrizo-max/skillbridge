'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Edit3, MapPin, Calendar, Star, BookOpen, Languages as LangIcon } from 'lucide-react'
import { Button, Badge, Avatar, Card, LoadingSpinner, Tabs } from '@/components/ui'
import { SkillBadge, RatingCard } from '@/components/domain'
import { useAuthStore } from '@/lib/stores'
import { mockTeachingSkills, mockLearningSkills, mockRatings, ROUTES } from '@/lib/mock'
import { formatDate } from '@/lib/utils'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('skills')
  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t) }, [])
  if (loading || !user) return <LoadingSpinner size="lg" className="py-32" />
  const myRatings = mockRatings.filter((r) => r.ratedId === user.id)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-base p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Avatar src={user.avatar} name={user.fullName} size="xl" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div><h1 className="font-display text-2xl">{user.fullName}</h1><p className="text-surface-500">@{user.username}</p></div>
              <Link href={ROUTES.profileEdit}><Button variant="secondary" size="sm"><Edit3 className="w-4 h-4" /> Tahrirlash</Button></Link>
            </div>
            <p className="text-surface-600 mb-4">{user.bio}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user.city}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(user.joinDate)}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {user.rating.toFixed(1)} ({user.ratingCount})</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {user.completedSessions} seans</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">{user.languages.map((l) => <Badge key={l}><LangIcon className="w-3 h-3 mr-1" />{l}</Badge>)}</div>
          </div>
        </div>
      </motion.div>

      <Tabs tabs={[{ id: 'skills', label: "Ko'nikmalar", count: mockTeachingSkills.length + mockLearningSkills.length }, { id: 'ratings', label: 'Baholar', count: myRatings.length }]} onChange={setTab}>
        {tab === 'skills' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card><h3 className="font-display text-lg mb-4 text-primary-700">O'rgatishim mumkin</h3><div className="flex flex-wrap gap-2">{mockTeachingSkills.map((s) => <SkillBadge key={s.id} skill={s.skill} level={s.level} variant="teach" />)}</div></Card>
            <Card><h3 className="font-display text-lg mb-4 text-accent-500">O'rganmoqchiman</h3><div className="flex flex-wrap gap-2">{mockLearningSkills.map((s) => <SkillBadge key={s.id} skill={s.skill} variant="learn" />)}</div></Card>
          </motion.div>
        )}
        {tab === 'ratings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {myRatings.length > 0 ? myRatings.map((r) => <RatingCard key={r.id} rating={r} />) : <Card className="text-center py-12"><Star className="w-12 h-12 text-surface-300 mx-auto mb-3" /><p className="text-surface-500">Hozircha baholar yo'q</p></Card>}
          </motion.div>
        )}
      </Tabs>
    </div>
  )
}