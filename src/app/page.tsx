'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Search, MessageCircle, Star, ArrowRight, Shield, Globe, Sparkles } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { Navbar, Footer } from '@/components/layouts'
import { APP_NAME, APP_DESCRIPTION, ROUTES } from '@/lib/constants'

const features = [
  { icon: Search, title: 'Aqlli qidiruv', description: "Ko'nikmalar va tillar bo'yicha mos odamlarni toping." },
  { icon: Users, title: 'Moslash tizimi', description: "Ko'nikmalaringiz asosida eng yaxshi hamkorlar tavsiya qilinadi." },
  { icon: MessageCircle, title: 'Xususiy chat', description: "Ulanishdan keyin suhbatlashing va bilim almashing." },
  { icon: Star, title: 'Baho va sharhlar', description: "Har seansdan keyin baho bering, ishonch shakllantiring." },
  { icon: Shield, title: 'Xavfsiz muhit', description: "Hisobot berish va moderatsiya tizimi mavjud." },
  { icon: Globe, title: "Ko'p tilli", description: "Bir nechta tilda foydalaning." },
]

const steps = [
  { step: '1', title: "Ro'yxatdan o'ting", description: "Oddiy formani to'ldiring." },
  { step: '2', title: "Ko'nikma qo'shing", description: "Nima o'rgata olasiz va nima o'rganmoqchisiz — ikkalasini belgilang." },
  { step: '3', title: 'Hamkor toping', description: "Tizim eng mos hamkorlarni ko'rsatadi." },
  { step: '4', title: "O'rganing", description: "Ulaning va bilim almashishni boshlang." },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-60" />
        <div className="relative page-container py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <Badge variant="primary" size="md"><Sparkles className="w-3 h-3 mr-1" /> MVP</Badge>
            <h1 className="font-display text-4xl md:text-5xl text-surface-900 leading-tight mt-4 mb-4">
              Bilim almashish<br />
              <span className="text-primary-700 italic">yangi usuli</span>
            </h1>
            <p className="text-base md:text-lg text-surface-500 mb-8 max-w-lg leading-relaxed">
              O'rgatish va o'rganishni xohlovchilarni bog'laydigan platforma. Ko'nikmalaringizni baham ko'ring, yangi narsalarni o'rganing.
            </p>
            <div className="flex items-center gap-3">
              <Link href={ROUTES.register}><Button size="lg">Bepul boshlash <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link href={ROUTES.login}><Button variant="secondary" size="lg">Kirish</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats — inline, kichik */}
      <section className="border-y border-surface-200 bg-white">
        <div className="page-container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '1,200+', label: "Foydalanuvchi" },
              { value: '3,400+', label: "Ulanish" },
              { value: '50+', label: "Ko'nikma" },
              { value: '4.8', label: "O'rtacha baho" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl text-primary-700">{s.value}</div>
                <div className="text-xs text-surface-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — 3 ustunli, kichik kartalar */}
      <section className="py-16">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="section-title mb-2">Nima uchun SkillBridge?</h2>
            <p className="text-surface-400 text-sm max-w-md mx-auto">Eng mos hamkorlarni toping va bilim almashing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card-base p-5 group hover:border-primary-200">
                <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                  <f.icon className="w-4.5 h-4.5 text-primary-700" />
                </div>
                <h3 className="font-display text-base text-surface-900 mb-1">{f.title}</h3>
                <p className="text-xs text-surface-400 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — gorizontal, kichik */}
      <section className="py-14 bg-surface-900">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-2">Qanday ishlaydi?</h2>
            <p className="text-surface-400 text-sm">To'rt oddiy qadam.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-4">
                <div className="w-10 h-10 rounded-xl bg-primary-700/20 flex items-center justify-center mx-auto mb-3">
                  <span className="font-display text-lg text-primary-400">{s.step}</span>
                </div>
                <h3 className="font-display text-sm text-white mb-1">{s.title}</h3>
                <p className="text-xs text-surface-400 leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 px-8 py-12 md:px-16 md:py-14 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-3">Tayyormisiz?</h2>
            <p className="text-primary-200 text-sm max-w-md mx-auto mb-6">Hoziroq ro'yxatdan o'ting va bilim almashishni boshlang. Bepul!</p>
            <Link href={ROUTES.register}><Button variant="accent" size="lg">Bepul ro'yxatdan o'tish <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
