'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button, Input } from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import { useState } from 'react'

const schema = z.object({ emailOrUsername: z.string().min(1, "Email yoki foydalanuvchi nomini kiriting"), password: z.string().min(1, "Parolni kiriting") })
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async () => { setLoading(true); await new Promise((r) => setTimeout(r, 800)); router.push(ROUTES.dashboard) }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-3xl text-surface-900 mb-2">Tizimga kirish</h1>
      <p className="text-surface-500 mb-8">Hisobingizga kiring va o'rganishni davom ettiring.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Email yoki foydalanuvchi nomi" placeholder="email@example.com" error={errors.emailOrUsername?.message} {...register('emailOrUsername')} />
        <Input label="Parol" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded border-surface-300" /><span className="text-surface-600">Eslab qolish</span></label>
          <Link href={ROUTES.forgotPassword} className="text-sm text-primary-700 hover:underline">Parolni unutdingizmi?</Link>
        </div>
        <Button type="submit" fullWidth loading={loading} size="lg">Kirish</Button>
      </form>
      <p className="text-center text-sm text-surface-500 mt-8">Hisobingiz yo'qmi? <Link href={ROUTES.register} className="text-primary-700 font-medium hover:underline">Ro'yxatdan o'ting</Link></p>
    </motion.div>
  )
}