import { useState, useEffect, RefObject } from 'react'

// -- Simulate API delay --
const MOCK_DELAY = 600
export function simulateDelay<T>(data: T, delay = MOCK_DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

// -- Classnames --
export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]) {
  return inputs.filter(Boolean).map((input) => {
    if (typeof input === 'string') return input
    if (typeof input === 'object' && input !== null) return Object.entries(input).filter(([,v]) => v).map(([k]) => k).join(' ')
    return ''
  }).join(' ').trim()
}

// -- Formatters --
export function formatRelativeTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const m = Math.floor(diffMs / 60000), h = Math.floor(diffMs / 3600000), d = Math.floor(diffMs / 86400000)
  if (m < 1) return 'Hozirgina'
  if (m < 60) return `${m} daqiqa oldin`
  if (h < 24) return `${h} soat oldin`
  if (d < 7) return `${d} kun oldin`
  return new Date(dateString).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getMatchColor(p: number): string {
  if (p >= 80) return 'text-green-600 bg-green-50'
  if (p >= 60) return 'text-primary-700 bg-primary-50'
  if (p >= 40) return 'text-accent-500 bg-accent-50'
  return 'text-surface-500 bg-surface-100'
}

// -- Hooks --
export function useDebounce<T>(value: T, delay = 300): T {
  const [v, setV] = useState(value)
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t) }, [value, delay])
  return v
}

export function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) handler() }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [ref, handler])
}