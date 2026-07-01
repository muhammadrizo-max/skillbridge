'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Plus, X } from 'lucide-react'
import { Button, Input, Textarea, Select, Card } from '@/components/ui'
import { useAuthStore, useUIStore } from '@/lib/stores'
import { CITIES, LANGUAGES, ROUTES } from '@/lib/mock'
import Link from 'next/link'

const schema = z.object({ fullName: z.string().min(2), bio: z.string().max(300).optional(), city: z.string().min(1, "Shaharni tanlang") })
type FormData = z.infer<typeof schema>

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateUser } = useAuthStore()
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(false)
  const [langs, setLangs] = useState<string[]>(user?.languages || [])
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { fullName: user?.fullName || '', bio: user?.bio || '', city: user?.city || '' } })

  const toggleLang = (l: string) => setLangs((p) => p.includes(l) ? p.filter((x) => x !== l) : [...p, l])
  const onSubmit = async (data: FormData) => { setLoading(true); await new Promise((r) => setTimeout(r, 600)); updateUser({ ...data, languages: langs }); addToast({ type: 'success', message: "Profil yangilandi!" }); setLoading(false); router.push(ROUTES.profile) }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href={ROUTES.profile} className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 mb-4"><ArrowLeft className="w-4 h-4" /> Profilga qaytish</Link>
        <h1 className="section-title mb-2">Profilni tahrirlash</h1>
      </motion.div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card><h3 className="font-display text-lg mb-4">Asosiy ma'lumotlar</h3><div className="space-y-4">
          <Input label="To'liq ism" error={errors.fullName?.message} {...register('fullName')} />
          <Textarea label="Bio" placeholder="O'zingiz haqingizda..." error={errors.bio?.message} {...register('bio')} />
          <Select label="Shahar" options={CITIES.map((c) => ({ value: c, label: c }))} placeholder="Tanlang" error={errors.city?.message} {...register('city')} />
        </div></Card>
        <Card><h3 className="font-display text-lg mb-4">Tillar</h3><div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => <button key={l} type="button" onClick={() => toggleLang(l)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${langs.includes(l) ? 'bg-primary-700 text-white border-primary-700' : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300'}`}>{langs.includes(l) ? <span className="flex items-center gap-1"><X className="w-3 h-3" /> {l}</span> : <span className="flex items-center gap-1"><Plus className="w-3 h-3" /> {l}</span>}</button>)}
        </div></Card>
        <div className="flex gap-3">
          <Button type="submit" loading={loading}><Save className="w-4 h-4" /> Saqlash</Button>
          <Link href={ROUTES.profile}><Button variant="ghost">Bekor qilish</Button></Link>
        </div>
      </form>
    </div>
  )
}