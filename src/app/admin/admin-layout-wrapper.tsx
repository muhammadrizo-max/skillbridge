'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AdminPanelLayout } from '@/components/layouts'
import { ToastContainer } from '@/components/ui'

export default function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/admin/login') {
    return <>{children}<ToastContainer /></>
  }
  return <AdminPanelLayout>{children}</AdminPanelLayout>
}
