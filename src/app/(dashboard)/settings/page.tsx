'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Bell, Globe, Trash2 } from 'lucide-react'
import { Card, Button } from '@/components/ui'

export default function SettingsPage() {
  const [notif, setNotif] = useState(true)
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="section-title mb-2">Sozlamalar</h1><p className="text-surface-500">Hisobingiz sozlamalari.</p></motion.div>
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><Card>
          <div className="flex items-center gap-3 mb-4"><Lock className="w-5 h-5 text-surface-500" /><h3 className="font-display text-lg">Xavfsizlik</h3></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Parolni o'zgartirish</p><p className="text-xs text-surface-500">Hisobingiz parolini yangilang</p></div><Button variant="secondary" size="sm">O'zgartirish</Button></div>
        </Card></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><Card>
          <div className="flex items-center gap-3 mb-4"><Bell className="w-5 h-5 text-surface-500" /><h3 className="font-display text-lg">Bildirishnomalar</h3></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Platforma bildirishnomalari</p><p className="text-xs text-surface-500">Yangi xabarlar haqida bildirishnoma</p></div>
            <button onClick={() => setNotif(!notif)} className={`w-11 h-6 rounded-full transition-colors relative ${notif ? 'bg-primary-700' : 'bg-surface-300'}`}><div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5" style={{ left: notif ? '22px' : '2px' }} /></button>
          </div>
        </Card></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><Card>
          <div className="flex items-center gap-3 mb-4"><Globe className="w-5 h-5 text-surface-500" /><h3 className="font-display text-lg">Til</h3></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Platforma tili</p><p className="text-xs text-surface-500">Hozir: O'zbek</p></div><Button variant="secondary" size="sm">O'zgartirish</Button></div>
        </Card></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><Card className="border-red-100">
          <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-red-500" /><h3 className="font-display text-lg text-red-700">Xavfli zona</h3></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Hisobni o'chirish</p><p className="text-xs text-surface-500">Bu amal qaytarib bo'lmaydi</p></div><Button variant="danger" size="sm">O'chirish</Button></div>
        </Card></motion.div>
      </div>
    </div>
  )
}