'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Globe, Shield, Image } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { useUIStore } from '@/lib/stores'

export default function AdminSettingsPage() {
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('SkillBridge')
  const [desc, setDesc] = useState("Bilim almashish platformasi")
  const handleSave = async () => { setLoading(true); await new Promise((r) => setTimeout(r, 600)); addToast({ type: 'success', message: 'Saqlandi!' }); setLoading(false) }

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="font-display text-3xl mb-2">Sozlamalar</h1></motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><Card>
        <div className="flex items-center gap-3 mb-6"><Globe className="w-5 h-5 text-surface-500" /><h3 className="font-display text-lg">Umumiy</h3></div>
        <div className="space-y-4"><Input label="Platforma nomi" value={name} onChange={(e) => setName(e.target.value)} /><Input label="Tavsif" value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
      </Card></motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><Card>
        <div className="flex items-center gap-3 mb-6"><Image className="w-5 h-5 text-surface-500" /><h3 className="font-display text-lg">Brending</h3></div>
        <div className="border-2 border-dashed border-surface-200 rounded-xl p-8 text-center"><Image className="w-8 h-8 text-surface-300 mx-auto mb-2" /><p className="text-sm text-surface-500">Logoni yuklash uchun bosing</p></div>
      </Card></motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><Card>
        <div className="flex items-center gap-3 mb-6"><Shield className="w-5 h-5 text-surface-500" /><h3 className="font-display text-lg">Xavfsizlik</h3></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Email tasdiqlash</p><p className="text-xs text-surface-500">Yangi foydalanuvchilar emailni tasdiqlashi shart</p></div><button className="w-11 h-6 rounded-full bg-primary-700 relative"><div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5" style={{left:'22px'}} /></button></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Avtomatik moderatsiya</p><p className="text-xs text-surface-500">Shikoyatlar avtomatik ko'rib chiqiladi</p></div><button className="w-11 h-6 rounded-full bg-surface-300 relative"><div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 left-0.5" /></button></div>
        </div>
      </Card></motion.div>
      <Button onClick={handleSave} loading={loading} size="lg"><Save className="w-4 h-4" /> Saqlash</Button>
    </div>
  )
}