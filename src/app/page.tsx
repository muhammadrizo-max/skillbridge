'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, BookOpen, Search, MessageCircle, Star, ArrowRight, Shield, Globe, Sparkles } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { Navbar, Footer } from '@/components/layouts'
import { APP_NAME, APP_DESCRIPTION, ROUTES } from '@/lib/constants'

const features = [
  { icon: Search, title: 'Aqlli qidiruv', description: "Ko'nikmalar, tillar va joylashuv bo'yicha eng mos o'qituvchi yoki o'quvchini toping." },
  { icon: Users, title: 'Moslash tizimi', description: "Tizim sizning ko'nikmalaringiz asosida eng yaxshi hamkorlarni tavsiya qiladi." },
  { icon: MessageCircle, title: 'Xususiy chat', description: "Ulanishdan so'ng darhol suhbatlashing va bilim almashishni boshlang." },
  { icon: Star, title: 'Baho va sharhlar', description: "Har bir seansdan keyin baho bering va ishonchli reyting shakllantiring." },
  { icon: Shield, title: 'Xavfsiz muhit', description: "Hisobot berish va moderatsiya tizimi orqali xavfsiz muhit ta'minlanadi." },
  { icon: Globe, title: "Ko'p tilli", description: "Platforma bir nechta tillarni qo'llab-quvvatlaydi." },
]

const stats = [
  { value: '1,200+', label: "Foydalanuvchilar" }, { value: '3,400+', label: "Ulanishlar" },
  { value: '50+', label: "Ko'nikmalar" }, { value: '4.8', label: "O'rtacha baho" },
]

const howItWorks = [
  { step: '01', title: "Ro'yxatdan o'ting", description: "Oddiy formani to'ldiring va profilingizni yarating." },
  { step: '02', title: "Ko'nikmalaringizni qo'shing", description: "Nima o'rgata olasiz va nima o'rganmoqchisiz — ikkalasini ham belgilang." },
  { step: '03', title: 'Hamkor toping', description: "Tizim sizga eng mos hamkorlarni ko'rsatadi." },
  { step: '04', title: "O'rganing va o'rgating", description: "Ulaning, suhbatlashing va bilim almashishni boshlang." },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="relative page-container py-20 md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" size="md"><Sparkles className="w-3.5 h-3.5 mr-1" /> MVP — Hoziroq boshlang</Badge>
            <h1 className="font-display text-5xl md:text-7xl text-surface-900 leading-tight mb-6 mt-6">Bilim almashish <span className="text-primary-700 italic">yangi</span> usuli</h1>
            <p className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto mb-10 leading-relaxed">{APP_DESCRIPTION}. O'rgatish va o'rganishni xohlovchilarni toping, ulaning va birga rivojlaning.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={ROUTES.register}><Button size="lg" className="text-base px-8">Bepul boshlash <ArrowRight className="w-5 h-5" /></Button></Link>
              <Link href={ROUTES.login}><Button variant="secondary" size="lg" className="text-base">Tizimga kirish</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-surface-200">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-primary-700 mb-1">{s.value}</div>
                <div className="text-sm text-surface-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-title mb-4">Nima uchun SkillBridge?</h2>
            <p className="text-surface-500 max-w-lg mx-auto">Platforma sizga eng mos hamkorlarni topish va bilim almashishda yordam beradi.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-base p-8 group hover:border-primary-200">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors"><f.icon className="w-6 h-6 text-primary-700" /></div>
                <h3 className="font-display text-xl text-surface-900 mb-2">{f.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 bg-surface-900">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Qanday ishlaydi?</h2>
            <p className="text-surface-400 max-w-lg mx-auto">To'rt oddiy qadam bilan boshlang.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-700/20 flex items-center justify-center mx-auto mb-5"><span className="font-display text-2xl text-primary-400">{s.step}</span></div>
                <h3 className="font-display text-lg text-white mb-2">{s.title}</h3>
                <p className="text-sm text-surface-400 leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 p-12 md:p-20 text-center overflow-hidden">
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl text-white mb-6">Tayyormisiz?</h2>
              <p className="text-primary-200 max-w-lg mx-auto mb-8 text-lg">Hoziroq ro'yxatdan o'ting va bilim almashish safaringizni boshlang. Bepul!</p>
              <Link href={ROUTES.register}><Button variant="accent" size="lg" className="text-base px-10">Bepul ro'yxatdan o'tish <ArrowRight className="w-5 h-5" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
