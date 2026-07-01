'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Star, BookOpen, MessageCircle, Users, ArrowRight, Languages, Check, X, Clock, Flag } from 'lucide-react'
import { Avatar, Badge, Button, Card } from './ui'
import { cn, getMatchColor, formatRelativeTime } from '@/lib/utils'
import type { User, MatchResult, Connection, Rating, Skill, SkillLevel } from '@/lib/types'
import { useUIStore } from '@/lib/stores'

/* =================== SKILL BADGE =================== */
export function SkillBadge({ skill, level, variant = 'teach', className }: { skill: Skill; level?: SkillLevel; variant?: 'teach'|'learn'; className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors', variant === 'teach' ? 'bg-primary-50 border-primary-200 text-primary-800' : 'bg-accent-50 border-accent-200 text-accent-600', className)}>
      <span className="font-medium">{skill.name}</span>
      {level && <span className={cn('text-xs px-1.5 py-0.5 rounded-full', variant === 'teach' ? 'bg-primary-100 text-primary-600' : 'bg-accent-100 text-accent-500')}>{level}</span>}
    </div>
  )
}

/* =================== PROFILE CARD =================== */
export function ProfileCard({ user, showActions = true, onConnect, className }: { user: User; showActions?: boolean; onConnect?: () => void; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn('card-base p-6', className)}>
      <div className="flex items-start gap-4">
        <Avatar src={user.avatar} name={user.fullName} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/profile/${user.id}`} className="font-display text-lg text-surface-900 hover:text-primary-700 transition-colors truncate">{user.fullName}</Link>
            {user.isVerified && <Badge variant="success">Tasdiqlangan</Badge>}
          </div>
          <p className="text-sm text-surface-500 mb-2">@{user.username}</p>
          <p className="text-sm text-surface-600 line-clamp-2 mb-3">{user.bio}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-surface-500">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{user.city}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{user.rating.toFixed(1)} ({user.ratingCount})</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{user.completedSessions} seans</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {user.languages.map((l) => <Badge key={l}>{l}</Badge>)}
          </div>
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-surface-100">
          <Button size="sm" onClick={onConnect} fullWidth><MessageCircle className="w-4 h-4" /> Ulanish</Button>
          <Link href={`/profile/${user.id}`} className="flex-1"><Button variant="secondary" size="sm" fullWidth>Profil</Button></Link>
        </div>
      )}
    </motion.div>
  )
}

/* =================== MATCH CARD =================== */
export function MatchCard({ match, index = 0, onConnect }: { match: MatchResult; index?: number; onConnect?: () => void }) {
  const { user, matchPercentage, sharedTeachSkills, sharedLearnSkills, sharedLanguages } = match
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-base p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} name={user.fullName} size="lg" />
          <div>
            <Link href={`/profile/${user.id}`} className="font-display text-lg text-surface-900 hover:text-primary-700 transition-colors">{user.fullName}</Link>
            <p className="text-sm text-surface-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {user.city}</p>
          </div>
        </div>
        <div className={cn('px-3 py-1.5 rounded-full text-sm font-bold', getMatchColor(matchPercentage))}>{matchPercentage}%</div>
      </div>
      {sharedTeachSkills.length > 0 && <div className="mb-3"><p className="text-xs text-surface-500 mb-1.5 flex items-center gap-1"><Users className="w-3 h-3" /> Sizga o'rgata oladi:</p><div className="flex flex-wrap gap-1.5">{sharedTeachSkills.map((s) => <SkillBadge key={s.id} skill={s} variant="teach" />)}</div></div>}
      {sharedLearnSkills.length > 0 && <div className="mb-3"><p className="text-xs text-surface-500 mb-1.5">Sizdan o'rganmoqchi:</p><div className="flex flex-wrap gap-1.5">{sharedLearnSkills.map((s) => <SkillBadge key={s.id} skill={s} variant="learn" />)}</div></div>}
      {sharedLanguages.length > 0 && <div className="flex items-center gap-1.5 text-xs text-surface-500 mb-4"><Languages className="w-3.5 h-3.5" /><span>Umumiy tillar: {sharedLanguages.join(', ')}</span></div>}
      <div className="flex gap-2">
        <Button size="sm" onClick={onConnect} fullWidth>Ulanish <ArrowRight className="w-4 h-4" /></Button>
        <Link href={`/profile/${user.id}`}><Button variant="ghost" size="sm">Profil</Button></Link>
      </div>
    </motion.div>
  )
}

/* =================== CONNECTION CARD =================== */
export function ConnectionCard({ connection, type, onAccept, onReject, onCancel }: { connection: Connection; type: 'incoming'|'outgoing'|'active'; onAccept?: () => void; onReject?: () => void; onCancel?: () => void }) {
  const otherUser = type === 'incoming' ? connection.sender : connection.receiver
  if (!otherUser) return null
  return (
    <div className="card-base p-5">
      <div className="flex items-center gap-4">
        <Avatar src={otherUser.avatar} name={otherUser.fullName} size="md" />
        <div className="flex-1 min-w-0">
          <Link href={`/profile/${otherUser.id}`} className="font-medium text-surface-900 hover:text-primary-700 transition-colors">{otherUser.fullName}</Link>
          <p className="text-xs text-surface-500 mt-0.5">{otherUser.city} · {formatRelativeTime(connection.createdAt)}</p>
        </div>
        {connection.status === 'pending' && type === 'incoming' && <div className="flex gap-2"><Button size="sm" onClick={onAccept}><Check className="w-4 h-4" /> Qabul</Button><Button variant="ghost" size="sm" onClick={onReject}><X className="w-4 h-4" /></Button></div>}
        {connection.status === 'pending' && type === 'outgoing' && <div className="flex items-center gap-2"><Badge variant="warning"><Clock className="w-3 h-3 mr-1" /> Kutilmoqda</Badge><Button variant="ghost" size="sm" onClick={onCancel}>Bekor qilish</Button></div>}
        {connection.status === 'accepted' && <Link href={`/chat/${connection.id}`}><Button variant="secondary" size="sm">Xabar</Button></Link>}
        {connection.status === 'rejected' && <Badge variant="danger">Rad etilgan</Badge>}
      </div>
    </div>
  )
}

/* =================== RATING CARD =================== */
export function RatingCard({ rating }: { rating: Rating }) {
  const user = rating.rater
  if (!user) return null
  return (
    <div className="card-base p-5">
      <div className="flex items-start gap-3">
        <Avatar src={user.avatar} name={user.fullName} size="sm" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-sm text-surface-900">{user.fullName}</span>
            <span className="text-xs text-surface-400">{formatRelativeTime(rating.createdAt)}</span>
          </div>
          <div className="flex items-center gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < rating.score ? 'text-amber-400 fill-amber-400' : 'text-surface-200'}`} />)}
          </div>
          <p className="text-sm text-surface-600">{rating.review}</p>
        </div>
      </div>
    </div>
  )
}

/* =================== MESSAGE BUBBLE =================== */
export function MessageBubble({ message, isOwn }: { message: { content: string; timestamp: string; type: string }; isOwn: boolean }) {
  return (
    <div className={cn('flex mb-3', isOwn ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[75%] px-4 py-2.5 rounded-2xl text-sm', isOwn ? 'bg-primary-700 text-white rounded-br-md' : 'bg-surface-100 text-surface-900 rounded-bl-md')}>
        <p>{message.content}</p>
        <p className={cn('text-[10px] mt-1', isOwn ? 'text-primary-200' : 'text-surface-400')}>{new Date(message.timestamp).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  )
}