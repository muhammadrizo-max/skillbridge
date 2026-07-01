'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Search } from 'lucide-react'
import { Button, Badge, LoadingSpinner, Select } from '@/components/ui'
import { adminService } from '@/lib/services'
import { SKILL_CATEGORIES } from '@/lib/mock'
import type { Skill } from '@/lib/types'

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [name, setName] = useState('')
  const [cat, setCat] = useState('')
  useEffect(() => { (async () => { setSkills(await adminService.getSkills()); setLoading(false) })() }, [])

  const add = async () => { if (!name || !cat) return; setSkills((p) => [...p, await adminService.addSkill({ name, category: cat as Skill['category'] })]); setName(''); setCat('') }
  const remove = async (id: string) => { await adminService.deleteSkill(id); setSkills((p) => p.filter((s) => s.id !== id)) }
  const filtered = skills.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.category.toLowerCase().includes(q.toLowerCase()))

  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="font-display text-3xl mb-2">Ko'nikmalar</h1></motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-base p-6">
        <h3 className="font-medium mb-4">Yangi ko'nikma</h3>
        <div className="flex flex-wrap gap-3">
          <input placeholder="Nomi" value={name} onChange={(e) => setName(e.target.value)} className="input-base flex-1 min-w-[200px]" />
          <Select options={SKILL_CATEGORIES.map((c) => ({ value: c, label: c }))} placeholder="Kategoriya" value={cat} onChange={(e) => setCat(e.target.value)} />
          <Button onClick={add} disabled={!name || !cat}><Plus className="w-4 h-4" /> Qo'shish</Button>
        </div>
      </motion.div>
      <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" /><input placeholder="Qidirish..." value={q} onChange={(e) => setQ(e.target.value)} className="input-base pl-12" /></div>
      <div className="card-base overflow-hidden"><table className="w-full">
        <thead><tr className="border-b bg-surface-50"><th className="text-left px-6 py-3 text-xs font-medium text-surface-500 uppercase">Ko'nikma</th><th className="text-left px-6 py-3 text-xs font-medium text-surface-500 uppercase">Kategoriya</th><th className="text-right px-6 py-3 text-xs font-medium text-surface-500 uppercase">Amallar</th></tr></thead>
        <tbody className="divide-y divide-surface-100">{filtered.map((s) => (
          <tr key={s.id} className="hover:bg-surface-50"><td className="px-6 py-4 text-sm font-medium">{s.name}</td><td className="px-6 py-4"><Badge variant="primary">{s.category}</Badge></td><td className="px-6 py-4 text-right"><button onClick={() => remove(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button></td></tr>
        ))}</tbody>
      </table></div>
    </div>
  )
}