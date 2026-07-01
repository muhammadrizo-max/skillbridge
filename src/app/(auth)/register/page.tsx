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

const schema = z.object({
  fullName: z.string().min(2, "Ism kamida 2 ta belgi bo'lishi kerak"),
  username: z.string().min(3, "Kamida 3 ta belgi").regex(/^[a-zA-Z0-9_]+$/, "Faqat harflar, raqamlar va _"),
  email: z.string().email("Noto'g'ri email"),
  password: z.string().min(8, "Kamida 8 ta belgi"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Parollar mos kelmaydi", path: ["confirmPassword"] })
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = async () => { setLoading(true); await new Promise((r) => setTimeout(r, 800)); router.push(ROUTES.verifyEmail) }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-3xl text-surface-900 mb-2">Hisob yaratish</h1>
      <p className="text-surface-500 mb-8">Bepul ro'yxatdan o'ting va bilim almashishni boshlang.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="To'liq ism" placeholder="Aziz Karimov" error={errors.fullName?.message} {...register('fullName')} />
        <Input label="Foydalanuvchi nomi" placeholder="aziz_dev" error={errors.username?.message} {...register('username')} />
        <Input label="Email manzil" type="email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Parol" type="password" placeholder="Kamida 8 ta belgi" error={errors.password?.message} {...register('password')} />
        <Input label="Parolni tasdiqlash" type="password" placeholder="Qaytadan kiriting" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="rounded border-surface-300 mt-0.5" /><span className="text-surface-600">Men <span className="text-primary-700">foydalanish shartlari</span> bilan tanishdim</span></label>
        <Button type="submit" fullWidth loading={loading} size="lg">Ro'yxatdan o'tish</Button>
      </form>
      <p className="text-center text-sm text-surface-500 mt-8">Hisobingiz bormi? <Link href={ROUTES.login} className="text-primary-700 font-medium hover:underline">Tizimga kiring</Link></p>
    </motion.div>
  )
}