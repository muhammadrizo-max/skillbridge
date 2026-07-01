'use client'

import { useState, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Bell, MessageCircle, User, Menu, X, LogOut, LayoutDashboard, Settings, ChevronDown, Shield, Users as UsersIcon, BookOpen, Flag, Star, Link2 } from 'lucide-react'
import { Avatar, Badge, ToastContainer } from './ui'
import { cn, useClickOutside } from '@/lib/utils'
import { useAuthStore, useUIStore } from '@/lib/stores'
import { APP_NAME, ROUTES, mockNotifications, mockUsers } from '@/lib/mock'

/* =================== NAVBAR =================== */
export function Navbar() {
  const { user, isAuthenticated } = useAuthStore()
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const pathname = usePathname()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  useClickOutside(profileRef, () => setProfileOpen(false))
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length

  const navLinks = isAuthenticated
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
      <nav className="page-container flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href={isAuthenticated ? ROUTES.dashboard : ROUTES.home} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center"><span className="text-white font-display text-lg">S</span></div>
            <span className="font-display text-xl text-surface-900">{APP_NAME}</span>
          </Link>
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors', pathname === l.href || pathname.startsWith(l.href + '/') ? 'text-primary-700 bg-primary-50' : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100')}>{l.label}</Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href={ROUTES.search} className="p-2 rounded-lg hover:bg-surface-100 hidden md:flex"><Search className="w-5 h-5 text-surface-500" /></Link>
              <Link href={ROUTES.chat} className="p-2 rounded-lg hover:bg-surface-100 hidden md:flex"><MessageCircle className="w-5 h-5 text-surface-500" /></Link>
              <Link href={ROUTES.notifications} className="relative p-2 rounded-lg hover:bg-surface-100 hidden md:flex">
                <Bell className="w-5 h-5 text-surface-500" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{unreadCount}</span>}
              </Link>
              <div ref={profileRef} className="relative hidden md:block">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100">
                  <Avatar src={user?.avatar} name={user?.fullName || ''} size="sm" />
                  <ChevronDown className={cn('w-4 h-4 text-surface-400 transition-transform', profileOpen && 'rotate-180')} />
                </button>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-elevated border border-surface-200 py-2">
                    <div className="px-4 py-3 border-b border-surface-100"><p className="font-medium text-sm">{user?.fullName}</p><p className="text-xs text-surface-500">@{user?.username}</p></div>
                    <Link href={ROUTES.profile} className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-600 hover:bg-surface-50" onClick={() => setProfileOpen(false)}><User className="w-4 h-4" /> Profilim</Link>
                    <Link href={ROUTES.settings} className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-600 hover:bg-surface-50" onClick={() => setProfileOpen(false)}><Settings className="w-4 h-4" /> Sozlamalar</Link>
                    <div className="border-t border-surface-100 mt-1 pt-1"><button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full" onClick={() => setProfileOpen(false)}><LogOut className="w-4 h-4" /> Chiqish</button></div>
                  </motion.div>
                )}
              </div>
              <button className="lg:hidden p-2 rounded-lg hover:bg-surface-100" onClick={toggleMobileMenu}>{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={ROUTES.login}><button className="btn-ghost">Kirish</button></Link>
              <Link href={ROUTES.register}><button className="btn-primary">Ro'yxatdan o'tish</button></Link>
            </div>
          )}
        </div>
      </nav>

      {mobileMenuOpen && isAuthenticated && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="lg:hidden border-t border-surface-200 bg-white">
          <div className="page-container py-4 space-y-1">
            {navLinks.map((l) => <Link key={l.href} href={l.href} onClick={closeMobileMenu} className={cn('block px-4 py-3 rounded-xl text-sm font-medium', pathname === l.href ? 'text-primary-700 bg-primary-50' : 'text-surface-600 hover:bg-surface-50')}>{l.label}</Link>)}
            <div className="border-t border-surface-100 pt-3 mt-3">
              <Link href={ROUTES.notifications} onClick={closeMobileMenu} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-surface-600 hover:bg-surface-50"><span className="flex items-center gap-2"><Bell className="w-4 h-4" /> Bildirishnomalar</span>{unreadCount > 0 && <Badge variant="danger">{unreadCount}</Badge>}</Link>
              <Link href={ROUTES.profile} onClick={closeMobileMenu} className="block px-4 py-3 rounded-xl text-sm text-surface-600 hover:bg-surface-50">Profilim</Link>
              <Link href={ROUTES.settings} onClick={closeMobileMenu} className="block px-4 py-3 rounded-xl text-sm text-surface-600 hover:bg-surface-50">Sozlamalar</Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

/* =================== FOOTER =================== */
export function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center"><span className="text-white font-display text-lg">S</span></div>
              <span className="font-display text-xl text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm text-surface-400 max-w-sm leading-relaxed">Bilim almashish platformasi — o'rgatish va o'rganishni xohlovchilarni bog'laydi.</p>
          </div>
          <div>
            <h4 className="font-display text-white mb-4">Platforma</h4>
            <div className="space-y-2">
              <Link href={ROUTES.search} className="block text-sm hover:text-white transition-colors">Qidiruv</Link>
              <Link href={ROUTES.matching} className="block text-sm hover:text-white transition-colors">Moslash</Link>
              <Link href={ROUTES.register} className="block text-sm hover:text-white transition-colors">Ro'yxatdan o'tish</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-white mb-4">Yordam</h4>
            <div className="space-y-2"><span className="block text-sm text-surface-500">FAQ (Tez orada)</span><span className="block text-sm text-surface-500">Maxfiylik siyosati</span><span className="block text-sm text-surface-500">Foydalanish shartlari</span></div>
          </div>
        </div>
        <div className="border-t border-surface-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">&copy; {new Date().getFullYear()} {APP_NAME}. Barcha huquqlar himoyalangan.</p>
          <p className="text-xs text-surface-500">O'zbekistonda yaratilgan</p>
        </div>
      </div>
    </footer>
  )
}

/* =================== DASHBOARD LAYOUT =================== */
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><div className="page-container py-8">{children}</div></main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

/* =================== AUTH LAYOUT =================== */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 to-primary-900 items-center justify-center relative overflow-hidden">
        <div className="relative text-center p-12">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-8"><span className="text-white font-display text-3xl">S</span></div>
          <h2 className="font-display text-4xl text-white mb-4">Bilim almashish platformasi</h2>
          <p className="text-primary-200 max-w-sm mx-auto">O'rgatish va o'rganishni xohlovchilarni bog'laydigan zamonaviy platforma.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center"><span className="text-white font-display text-lg">S</span></div>
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
export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const admin = mockUsers.find((u) => u.role === 'admin')!

  if (pathname === '/admin/login') return <><children /><ToastContainer /></>

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
      <aside className={cn('fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-surface-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto', sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-surface-100">
            <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
            <div><span className="font-display text-lg">{APP_NAME}</span><p className="text-[10px] text-surface-400 uppercase tracking-wider">Admin</p></div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', pathname === item.href ? 'bg-primary-50 text-primary-700' : 'text-surface-600 hover:bg-surface-50')}>
                <item.icon className="w-5 h-5" />{item.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-surface-100">
            <div className="flex items-center gap-3">
              <Avatar src={admin.avatar} name={admin.fullName} size="sm" />
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{admin.fullName}</p><p className="text-xs text-surface-500">Administrator</p></div>
              <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400"><LogOut className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-surface-200 px-6 py-3 flex items-center lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-surface-100"><Menu className="w-5 h-5" /></button>
          <span className="font-display text-lg ml-3">{APP_NAME} Admin</span>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
      <ToastContainer />
    </div>
  )
}