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
  emailOrUsername: z.string().min(1, "Email yoki foydalanuvchi nomini kiriting"),
  password: z.string().min(1, "Parolni kiriting"),
})
type FormData = z.infer<typeof schema>

/* Social login ikonkalari */
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
)
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
)
const TelegramIcon = () => (
  <svg className="w-5 h-5" fill="#229ED9" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
)

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center justify-center gap-2.5 flex-1 py-2.5 bg-white border border-surface-200 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-all">
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async () => { setLoading(true); await new Promise((r) => setTimeout(r, 800)); router.push(ROUTES.dashboard) }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl text-surface-900 mb-1">Xush kelibsiz</h1>
      <p className="text-surface-400 text-sm mb-6">Hisobingizga kiring va o&apos;rganishni davom eting.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email manzilingiz" placeholder="email@example.com" error={errors.emailOrUsername?.message} {...register('emailOrUsername')} />
        <Input label="Parollingiz" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-surface-300 w-4 h-4" /><span className="text-surface-500">Meni eslab qolish</span></label>
          <Link href={ROUTES.forgotPassword} className="text-primary-700 hover:underline text-xs">Parolni unutdingiz?</Link>
        </div>

        <Button type="submit" fullWidth loading={loading} size="lg">Kirish</Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200" /></div>
        <div className="relative flex justify-center"><span className="bg-surface-50 px-3 text-xs text-surface-400">Yoki quyidagi orqali kiring</span></div>
      </div>

      <div className="flex gap-3">
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GithubIcon />} label="GitHub" />
        <SocialButton icon={<TelegramIcon />} label="Telegram" />
      </div>

      <p className="text-center text-sm text-surface-400 mt-6">
        Hisobingiz yo&apos;qmi?{' '}
        <Link href={ROUTES.register} className="text-primary-700 font-medium hover:underline">Ro&apos;yxatdan o&apos;tish</Link>
      </p>
    </motion.div>
  )
}
