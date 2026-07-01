'use client'

import { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { cn, getInitials } from '@/lib/utils'
import { useUIStore } from '@/lib/stores'

/* =================== BUTTON =================== */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary'|'secondary'|'accent'|'ghost'|'danger'
  size?: 'sm'|'md'|'lg'; loading?: boolean; fullWidth?: boolean
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant='primary', size='md', loading, fullWidth, children, disabled, ...props }, ref) => {
    const v: Record<string, string> = {
      primary: 'btn-primary', secondary: 'btn-secondary', accent: 'btn-accent',
      ghost: 'btn-ghost', danger: 'btn-danger',
    }
    const s: Record<string, string> = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
    return (
      <button ref={ref} className={cn(v[variant], s[size], fullWidth && 'w-full', 'inline-flex items-center justify-center gap-2', className)} disabled={disabled || loading} {...props}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

/* =================== INPUT =================== */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; hint?: string }
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-surface-700">{label}</label>}
        <input ref={ref} id={inputId} className={cn('input-base', error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500', className)} {...props} />
        {error && <p className="text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="text-xs text-surface-400">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

/* =================== TEXTAREA =================== */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; error?: string }
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-surface-700">{label}</label>}
        <textarea ref={ref} id={inputId} className={cn('input-base min-h-[100px] resize-y', error && 'border-red-500', className)} {...props} />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

/* =================== SELECT =================== */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label?: string; error?: string; options: { value: string; label: string }[]; placeholder?: string }
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={selectId} className="block text-sm font-medium text-surface-700">{label}</label>}
        <div className="relative">
          <select ref={ref} id={selectId} className={cn('input-base appearance-none pr-10', error && 'border-red-500', className)} {...props}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

/* =================== AVATAR =================== */
interface AvatarProps { src?: string; name: string; size?: 'sm'|'md'|'lg'|'xl'; className?: string }
const avatarSizes: Record<string, string> = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base', xl: 'w-20 h-20 text-xl' }
export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  if (src) return <div className={cn('relative rounded-full overflow-hidden flex-shrink-0', avatarSizes[size], className)}><Image src={src} alt={name} fill className="object-cover" unoptimized /></div>
  return <div className={cn('rounded-full bg-primary-700 text-white flex items-center justify-center font-display font-semibold flex-shrink-0', avatarSizes[size], className)}>{getInitials(name)}</div>
}

/* =================== BADGE =================== */
interface BadgeProps { children: ReactNode; variant?: 'default'|'primary'|'accent'|'success'|'warning'|'danger'|'info'; size?: 'sm'|'md'; className?: string }
const badgeVariants: Record<string, string> = {
  default: 'bg-surface-100 text-surface-600', primary: 'bg-primary-50 text-primary-700', accent: 'bg-accent-50 text-accent-500',
  success: 'bg-green-50 text-green-700', warning: 'bg-amber-50 text-amber-700', danger: 'bg-red-50 text-red-700', info: 'bg-blue-50 text-blue-700',
}
export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return <span className={cn('badge', badgeVariants[variant], size === 'md' && 'px-3 py-1 text-sm', className)}>{children}</span>
}

/* =================== CARD =================== */
interface CardProps { children: ReactNode; className?: string; hover?: boolean; padding?: 'none'|'sm'|'md'|'lg'; onClick?: () => void }
const cardPaddings: Record<string, string> = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }
export function Card({ children, className, hover = true, padding = 'md', onClick }: CardProps) {
  return <div className={cn('card-base', cardPaddings[padding], hover && 'hover:shadow-soft', onClick && 'cursor-pointer', className)} onClick={onClick}>{children}</div>
}

/* =================== MODAL =================== */
interface ModalProps { isOpen: boolean; onClose: () => void; title?: string; children: ReactNode; size?: 'sm'|'md'|'lg' }
const modalSizes: Record<string, string> = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }
export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [isOpen])
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className={cn('relative w-full bg-white rounded-2xl shadow-elevated z-10', modalSizes[size])}>
            {title && <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200"><h3 className="font-display text-xl text-surface-900">{title}</h3><button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100"><X className="w-5 h-5 text-surface-400" /></button></div>}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* =================== TABS =================== */
interface Tab { id: string; label: string; count?: number }
interface TabsProps { tabs: Tab[]; activeTab?: string; onChange: (id: string) => void; children?: ReactNode; className?: string }
export function Tabs({ tabs, activeTab, onChange, children, className }: TabsProps) {
  const [active, setActive] = useState(activeTab || tabs[0]?.id)
  const handleChange = (id: string) => { setActive(id); onChange(id) }
  return (
    <div className={className}>
      <div className="flex gap-1 p-1 bg-surface-100 rounded-xl mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => handleChange(tab.id)} className={cn('relative px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2', active === tab.id ? 'text-primary-700' : 'text-surface-500 hover:text-surface-700')}>
            {active === tab.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-lg shadow-sm" transition={{ type: 'spring', damping: 25, stiffness: 300 }} />}
            <span className="relative z-10">{tab.label}</span>
            {tab.count !== undefined && <span className={cn('relative z-10 text-xs px-1.5 py-0.5 rounded-full', active === tab.id ? 'bg-primary-100 text-primary-700' : 'bg-surface-200 text-surface-500')}>{tab.count}</span>}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
}

/* =================== PAGINATION =================== */
interface PaginationProps { currentPage: number; totalPages: number; onPageChange: (p: number) => void; className?: string }
export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-surface-100 disabled:opacity-30"><ChevronLeft className="w-5 h-5" /></button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={cn('w-10 h-10 rounded-lg text-sm font-medium transition-all', p === currentPage ? 'bg-primary-700 text-white shadow-sm' : 'hover:bg-surface-100 text-surface-600')}>{p}</button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-surface-100 disabled:opacity-30"><ChevronRight className="w-5 h-5" /></button>
    </div>
  )
}

/* =================== LOADING SPINNER =================== */
export function LoadingSpinner({ size = 'md', className }: { size?: 'sm'|'md'|'lg'; className?: string }) {
  const s: Record<string, string> = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return <div className={cn('flex items-center justify-center', className)}><div className={cn('border-2 border-surface-200 border-t-primary-700 rounded-full animate-spin', s[size])} /></div>
}

/* =================== EMPTY STATE =================== */
export function EmptyState({ icon, title, description, action, className }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>{icon && <div className="mb-4 text-surface-300">{icon}</div>}<h3 className="font-display text-xl text-surface-700 mb-2">{title}</h3>{description && <p className="text-surface-400 max-w-sm mb-6">{description}</p>}{action}</div>
}

/* =================== SKELETON =================== */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-xl bg-surface-200', className)} />
}

/* =================== TOAST CONTAINER =================== */
const toastIcons = { success: CheckCircle, error: AlertCircle, info: Info, warning: AlertTriangle }
const toastColors = { success: 'bg-green-50 border-green-200 text-green-800', error: 'bg-red-50 border-red-200 text-red-800', info: 'bg-blue-50 border-blue-200 text-blue-800', warning: 'bg-amber-50 border-amber-200 text-amber-800' }
export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 w-80">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = toastIcons[t.type]
          return (
            <motion.div key={t.id} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className={cn('flex items-start gap-3 p-4 rounded-xl border shadow-soft', toastColors[t.type])}>
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm flex-1">{t.message}</p>
              <button onClick={() => removeToast(t.id)}><X className="w-4 h-4 opacity-60 hover:opacity-100" /></button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}