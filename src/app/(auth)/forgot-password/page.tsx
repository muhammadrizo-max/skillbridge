'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button, Input } from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const schema = z.object({ email: z.string().email("Noto'g'ri email") })
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = async () => { setLoading(true); await new Promise((r) => setTimeout(r, 800)); setSent(true); setLoading(false) }

  if (sent) return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-green-600" /></div>
      <h1 className="font-display text-3xl text-surface-900 mb-3">Email yuborildi</h1>
      <p className="text-surface-500 mb-8">Parolni tiklash havolasi emailingizga yuborildi.</p>
      <Link href={ROUTES.login}><Button variant="secondary" fullWidth>Tizimga qaytish</Button></Link>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-3xl text-surface-900 mb-2">Parolni tiklash</h1>
      <p className="text-surface-500 mb-8">Email manzilingizni kiriting va biz havolani yuboramiz.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Email manzil" type="email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
        <Button type="submit" fullWidth loading={loading} size="lg">Havolani yuborish</Button>
      </form>
      <p className="text-center text-sm text-surface-500 mt-8"><Link href={ROUTES.login} className="text-primary-700 font-medium hover:underline">← Tizimga qaytish</Link></p>
    </motion.div>
  )
}