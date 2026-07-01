import type { Metadata } from 'next'
import './globals.css'
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_DESCRIPTION,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="uz"><body>{children}</body></html>
}