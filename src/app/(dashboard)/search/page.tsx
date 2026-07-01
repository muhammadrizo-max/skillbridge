'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, Filter, X, MapPin, Languages } from 'lucide-react'
import { Select, Button, Badge, LoadingSpinner, EmptyState } from '@/components/ui'
import { ProfileCard } from '@/components/domain'
import { mockUsers, CITIES, LANGUAGES } from '@/lib/mock'
import { useDebounce } from '@/lib/utils'
import type { User } from '@/lib/types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [language, setLanguage] = useState('')
  const [results, setResults] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const dq = useDebounce(query)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      let f = mockUsers.filter((u) => u.role === 'user')
      if (dq) { const q = dq.toLowerCase(); f = f.filter((u) => u.fullName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)) }
      if (city) f = f.filter((u) => u.city === city)
      if (language) f = f.filter((u) => u.languages.includes(language))
      setResults(f); setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [dq, city, language])

  const hasFilters = city || language

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Qidiruv</h1><p className="text-surface-500">O'qituvchi yoki o'quvchi toping.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input type="text" placeholder="Ism yoki foydalanuvchi nomi..." value={query} onChange={(e) => setQuery(e.target.value)} className="input-base pl-12" />
            {query && <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-surface-400" /></button>}
          </div>
          <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}><Filter className="w-4 h-4" /> Filter{hasFilters && <span className="w-2 h-2 rounded-full bg-primary-500" />}</Button>
        </div>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-4">
            <Select options={CITIES.map((c) => ({ value: c, label: c }))} placeholder="Shahar" value={city} onChange={(e) => setCity(e.target.value)} />
            <Select options={LANGUAGES.map((l) => ({ value: l, label: l }))} placeholder="Til" value={language} onChange={(e) => setLanguage(e.target.value)} />
            {hasFilters && <Button variant="ghost" size="sm" onClick={() => { setCity(''); setLanguage('') }}><X className="w-4 h-4" /> Tozalash</Button>}
          </motion.div>
        )}
        {hasFilters && <div className="flex flex-wrap gap-2">{city && <Badge variant="primary"><MapPin className="w-3 h-3 mr-1" />{city}</Badge>}{language && <Badge variant="accent"><Languages className="w-3 h-3 mr-1" />{language}</Badge>}</div>}
      </motion.div>
      {loading ? <LoadingSpinner size="lg" className="py-16" /> : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((u, i) => <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}><ProfileCard user={u} /></motion.div>)}
        </div>
      ) : <EmptyState icon={<SearchIcon className="w-16 h-16" />} title="Hech narsa topilmadi" description="Boshqa kalit so'zlar bilan urinib ko'ring." />}
    </div>
  )
}