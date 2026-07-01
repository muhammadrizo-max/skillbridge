import { ReactNode } from 'react'
import { AuthLayout } from '@/components/layouts'
export default function AuthPagesLayout({ children }: { children: ReactNode }) { return <AuthLayout>{children}</AuthLayout> }