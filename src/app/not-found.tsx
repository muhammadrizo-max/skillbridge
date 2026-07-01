import Link from 'next/link'
import { Button } from '@/components/ui'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
      <div className="text-center">
        <h1 className="font-display text-8xl text-primary-700 mb-4">404</h1>
        <h2 className="font-display text-2xl text-surface-900 mb-3">Sahifa topilmadi</h2>
        <p className="text-surface-500 mb-8 max-w-sm mx-auto">Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.</p>
        <Link href="/"><Button size="lg"><Home className="w-5 h-5" /> Bosh sahifaga qaytish</Button></Link>
      </div>
    </div>
  )
}