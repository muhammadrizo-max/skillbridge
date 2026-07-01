'use client'
import { ReactNode } from 'react'
import { DashboardLayout } from '@/components/layouts'
export default function DashboardPagesLayout({ children }: { children: ReactNode }) { return <DashboardLayout>{children}</DashboardLayout> }