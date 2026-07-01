'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { APP_NAME } from '@/lib/constants'

const schema = z.object({ email: z.string().email(), password: z.string().min(1) })
type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = async () => { setLoading(true); await new Promise((r) => setTimeout(r, 800)); router.push('/admin/dashboard') }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary-700 flex items-center justify-center mx-auto mb-4"><Shield className="w-7 h-7 text-white" /></div>
          <h1 className="font-display text-2xl">{APP_NAME} Admin</h1><p className="text-sm text-surface-500 mt-1">Administrator sifatida kirish</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input label="Parol" type="password" error={errors.password?.message} {...register('password')} />
          <Button type="submit" fullWidth loading={loading} size="lg">Kirish</Button>
        </form>
      </motion.div>
    </div>
  )
}