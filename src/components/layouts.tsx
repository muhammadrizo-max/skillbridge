'use client'

import { useState, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home, Search, Link2, MessageCircle, User, Settings,
  Bell, ChevronDown, Menu, X, LogOut, Sparkles, Shield,
  Users as UsersIcon, BookOpen, Flag, Star, LayoutDashboard
} from 'lucide-react'
import { Avatar, Badge, ToastContainer } from './ui'
import { cn, useClickOutside } from '@/lib/utils'
import { useAuthStore } from '@/lib/stores'
import { APP_NAME, ROUTES } from '@/lib/constants'
import { mockNotifications, mockUsers } from '@/lib/mock'

/* =================== NAVBAR (Landing page uchun) =================== */
export function Navbar() {
  const { isAuthenticated } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = isAuthenticated
    ? [
        { href: ROUTES.dashboard, label: 'Bosh sahifa' },
        { href: ROUTES.search, label: 'Qidiruv' },
        { href: ROUTES.matching, label: 'Moslash' },
        { href: ROUTES.connections, label: 'Ulanishlar' },
        { href: ROUTES.chat, label: 'Chat' },
      ]
    : []

  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-200/50">
      <nav className="page-container flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link href={isAuthenticated ? ROUTES.dashboard : ROUTES.home} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary-700 flex items-center justify-center">
              <span className="text-white font-display text-sm">S</span>
            </div>
            <span className="font-display text-lg text-surface-900">{APP_NAME}</span>
          </Link>
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-0.5">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 rounded-md text-sm font-medium text-surface-500 hover:text-surface-800 hover:bg-surface-100 transition-colors">{l.label}</Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button className="lg:hidden p-2 rounded-md hover:bg-surface-100" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={ROUTES.login}><button className="btn-ghost">Kirish</button></Link>
              <Link href={ROUTES.register}><button className="btn-primary">Ro&apos;yxatdan o&apos;tish</button></Link>
            </div>
          )}
        </div>
      </nav>
      {mobileOpen && isAuthenticated && (
        <div className="lg:hidden border-t border-surface-200 bg-white page-container py-3 space-y-0.5">
          {links.map((l) => <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-sm text-surface-600 hover:bg-surface-50">{l.label}</Link>)}
        </div>
      )}
    </header>
  )
}

/* =================== FOOTER (Landing page uchun) =================== */
export function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 border-t border-surface-800">
      <div className="page-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-primary-500 flex items-center justify-center"><span className="text-white font-display text-sm">S</span></div>
              <span className="font-display text-lg text-white">{APP_NAME}</span>
            </div>
            <p className="text-xs text-surface-400 leading-relaxed">Bilim almashish platformasi.<br />O&apos;rgatish va o&apos;rganishni xohlovchilarni bog&apos;laydi.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-surface-300 uppercase tracking-wider mb-3">Platforma</h4>
            <div className="flex flex-col gap-2">
              <Link href={ROUTES.search} className="text-xs text-surface-400 hover:text-white transition-colors">Qidiruv</Link>
              <Link href={ROUTES.matching} className="text-xs text-surface-400 hover:text-white transition-colors">Moslash</Link>
              <Link href={ROUTES.register} className="text-xs text-surface-400 hover:text-white transition-colors">Ro&apos;yxatdan o&apos;tish</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-surface-300 uppercase tracking-wider mb-3">Yordam</h4>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-surface-500">FAQ (Tez orada)</span>
              <span className="text-xs text-surface-500">Maxfiylik siyosati</span>
              <span className="text-xs text-surface-500">Foydalanish shartlari</span>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-surface-500">&copy; {new Date().getFullYear()} {APP_NAME}. Barcha huquqlar himoyalangan.</p>
          <p className="text-[11px] text-surface-600">O&apos;zbekistonda yaratilgan</p>
        </div>
      </div>
    </footer>
  )
}

/* =================== SIDEBAR NAV =================== */
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const items = [
    { href: ROUTES.dashboard, label: 'Bosh sahifa', icon: Home },
    { href: ROUTES.search, label: 'Qidiruv', icon: Search },
    { href: ROUTES.matching, label: 'Moslash', icon: Sparkles },
    { href: ROUTES.connections, label: 'Ulanishlar', icon: Link2 },
    { href: ROUTES.chat, label: 'Xabarlar', icon: MessageCircle },
    { href: ROUTES.profile, label: 'Profilim', icon: User },
    { href: ROUTES.notifications, label: 'Bildirishnomalar', icon: Bell },
    { href: ROUTES.settings, label: 'Sozlamalar', icon: Settings },
  ]

  const unread = mockNotifications.filter((n) => !n.isRead).length

  return (
    <>
      <div className="px-4 py-4 border-b border-surface-100">
        <Link href={ROUTES.dashboard} onClick={onNavigate} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center">
            <span className="text-white font-display text-sm">S</span>
          </div>
          <span className="font-display text-lg text-surface-900">{APP_NAME}</span>
        </Link>
      </div>

      <div className="px-4 py-3 border-b border-surface-100">
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatar} name={user?.fullName || ''} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-900 truncate">{user?.fullName}</p>
            <p className="text-[11px] text-surface-400">@{user?.username}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== ROUTES.dashboard && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate}
              className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all', active ? 'bg-primary-50 text-primary-700' : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700')}>
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
              {item.href === ROUTES.notifications && unread > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{unread}</span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pb-3">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-3.5 border border-primary-100">
          <p className="text-xs font-medium text-primary-800 mb-1">Do&apos;stlarni taklif qiling</p>
          <p className="text-[11px] text-primary-600/70 mb-2">Premium imkoniyatlarga ega bo&apos;ling!</p>
          <button className="w-full text-xs font-medium text-primary-700 bg-white rounded-lg py-1.5 hover:bg-primary-50 transition-colors">Taklif qilish</button>
        </div>
      </div>
    </>
  )
}

/* =================== TOP BAR =================== */
function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-surface-200/50">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-surface-100"><Menu className="w-5 h-5 text-surface-500" /></button>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input type="text" placeholder="Qidirish..." className="pl-9 pr-4 py-2 bg-surface-50 border-0 rounded-lg text-sm w-56 lg:w-72 focus:outline-none focus:ring-2 focus:ring-primary-700/20 focus:bg-white transition-all" />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link href={ROUTES.notifications} className="relative p-2 rounded-lg hover:bg-surface-100 md:hidden">
            <Bell className="w-5 h-5 text-surface-500" />
            {mockNotifications.filter((n) => !n.isRead).length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
          </Link>
          <div ref={ref} className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-100">
              <Avatar src={user?.avatar} name={user?.fullName || ''} size="sm" />
              <span className="text-sm font-medium text-surface-700 hidden sm:block">{user?.fullName?.split(' ')[0]}</span>
              <ChevronDown className={cn('w-3.5 h-3.5 text-surface-400 transition-transform hidden sm:block', open && 'rotate-180')} />
            </button>
            {open && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-surface-200 py-1.5 z-50">
                <div className="px-4 py-2.5 border-b border-surface-100"><p className="text-sm font-medium">{user?.fullName}</p><p className="text-xs text-surface-400">@{user?.username}</p></div>
                <Link href={ROUTES.profile} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-surface-600 hover:bg-surface-50"><User className="w-4 h-4" /> Profilim</Link>
                <Link href={ROUTES.settings} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-surface-600 hover:bg-surface-50"><Settings className="w-4 h-4" /> Sozlamalar</Link>
                <div className="border-t border-surface-100 mt-1 pt-1">
                  <button onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"><LogOut className="w-4 h-4" /> Chiqish</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

/* =================== DASHBOARD LAYOUT (Sidebar bilan) =================== */
export function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={cn('fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-surface-200 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto', sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <SidebarContent onNavigate={() => setSidebarOpen(false)} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>

      <ToastContainer />
    </div>
  )
}

/* =================== AUTH LAYOUT =================== */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(201,168,76,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
        <div className="relative text-center p-12 max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8">
            <span className="text-white font-display text-3xl">S</span>
          </div>
          <h2 className="font-display text-3xl text-white mb-4 leading-tight">Ko&apos;nikmalar sizni imkoniyatlarga olib boradi</h2>
          <p className="text-primary-200/80 text-sm leading-relaxed">O&apos;rganing, amalda bajaring va karyerangizni rivojlantiring.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-surface-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center"><span className="text-white font-display text-sm">S</span></div>
              <span className="font-display text-xl">{APP_NAME}</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

/* =================== ADMIN LAYOUT =================== */
export function AdminPanelLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const admin = mockUsers.find((u) => u.role === 'admin')!

  const navItems = [
    { href: '/admin/dashboard', label: 'Boshqaruv paneli', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Foydalanuvchilar', icon: UsersIcon },
    { href: '/admin/skills', label: "Ko'nikmalar", icon: BookOpen },
    { href: '/admin/reports', label: 'Hisobotlar', icon: Flag },
    { href: '/admin/ratings', label: 'Baholar', icon: Star },
    { href: '/admin/connections', label: 'Ulanishlar', icon: Link2 },
    { href: '/admin/settings', label: 'Sozlamalar', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <aside className={cn('fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-surface-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto', sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-100">
            <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
            <div><span className="font-display text-lg">{APP_NAME}</span><p className="text-[10px] text-surface-400 uppercase tracking-wider">Admin</p></div>
          </div>
          <nav className="flex-1 px-3 py-3 space-y-0.5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors', pathname === item.href ? 'bg-primary-50 text-primary-700' : 'text-surface-500 hover:bg-surface-50')}>
                <item.icon className="w-[18px] h-[18px]" />{item.label}
              </Link>
            ))}
          </nav>
          <div className="px-3 py-3 border-t border-surface-100">
            <div className="flex items-center gap-3">
              <Avatar src={admin.avatar} name={admin.fullName} size="sm" />
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{admin.fullName}</p><p className="text-[11px] text-surface-400">Administrator</p></div>
              <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400"><LogOut className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-surface-200 px-5 py-3 flex items-center lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-surface-100"><Menu className="w-5 h-5" /></button>
          <span className="font-display text-base ml-3">{APP_NAME} Admin</span>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
      <ToastContainer />
    </div>
  )
}
