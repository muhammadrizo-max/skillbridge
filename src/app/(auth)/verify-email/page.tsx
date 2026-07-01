'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import { Mail, CheckCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleVerify = async () => { setLoading(true); await new Promise((r) => setTimeout(r, 1000)); setVerified(true); setLoading(false) }

  if (verified) return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-green-600" /></div>
      <h1 className="font-display text-3xl text-surface-900 mb-3">Email tasdiqlandi!</h1>
      <p className="text-surface-500 mb-8">Hisobingiz muvaffaqiyatli tasdiqlandi.</p>
      <Link href={ROUTES.dashboard}><Button fullWidth size="lg">Bosh sahifaga o'tish</Button></Link>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6"><Mail className="w-8 h-8 text-primary-700" /></div>
      <h1 className="font-display text-3xl text-surface-900 mb-3">Emailni tasdiqlang</h1>
      <p className="text-surface-500 mb-8">Sizning emailingizga tasdiqlash havolasi yuborildi.</p>
      <div className="space-y-4">
        <Button onClick={handleVerify} fullWidth loading={loading} size="lg">Tasdiqlashni sinash</Button>
        <Button variant="ghost" fullWidth>Qaytadan yuborish</Button>
      </div>
      <p className="text-center text-sm text-surface-500 mt-8"><Link href={ROUTES.login} className="text-primary-700 font-medium hover:underline">← Tizimga qaytish</Link></p>
    </motion.div>
  )
}