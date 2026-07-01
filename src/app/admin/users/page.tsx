'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Ban, Trash2, CheckCircle } from 'lucide-react'
import { Avatar, Badge, LoadingSpinner } from '@/components/ui'
import { adminService } from '@/lib/services'
import { formatDate, cn } from '@/lib/utils'
import type { User } from '@/lib/types'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async () => { setUsers(await adminService.getUsers()); setLoading(false) })() }, [])

  const toggleSuspend = async (u: User) => {
    const updated = u.isSuspended ? await adminService.unsuspendUser(u.id) : await adminService.suspendUser(u.id)
    setUsers((p) => p.map((x) => x.id === u.id ? updated : x))
  }
  const deleteUser = async (id: string) => { await adminService.deleteUser(id); setUsers((p) => p.filter((u) => u.id !== id)) }

  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="font-display text-3xl mb-2">Foydalanuvchilar</h1></motion.div>
      <div className="card-base overflow-hidden"><div className="overflow-x-auto"><table className="w-full">
        <thead><tr className="border-b bg-surface-50">
          {['Foydalanuvchi','Shahar','Baho','Seanslar','Sana','Holat','Amallar'].map((h) => <th key={h} className="text-left px-6 py-3 text-xs font-medium text-surface-500 uppercase">{h}</th>)}
        </tr></thead>
        <tbody className="divide-y divide-surface-100">{users.map((u) => (
          <tr key={u.id} className="hover:bg-surface-50">
            <td className="px-6 py-4"><div className="flex items-center gap-3"><Avatar src={u.avatar} name={u.fullName} size="sm" /><div><p className="text-sm font-medium">{u.fullName}</p><p className="text-xs text-surface-500">@{u.username}</p></div></div></td>
            <td className="px-6 py-4 text-sm">{u.city}</td>
            <td className="px-6 py-4 text-sm">{u.rating.toFixed(1)}</td>
            <td className="px-6 py-4 text-sm">{u.completedSessions}</td>
            <td className="px-6 py-4 text-sm text-surface-500">{formatDate(u.joinDate)}</td>
            <td className="px-6 py-4">{u.isSuspended ? <Badge variant="danger">To'xtatilgan</Badge> : <Badge variant="success">Faol</Badge>}</td>
            <td className="px-6 py-4"><div className="flex items-center justify-end gap-2">
              <button onClick={() => toggleSuspend(u)} className={cn('p-1.5 rounded-lg', u.isSuspended ? 'hover:bg-green-50 text-green-600' : 'hover:bg-amber-50 text-amber-600')}>{u.isSuspended ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}</button>
              <button onClick={() => deleteUser(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div></td>
          </tr>
        ))}</tbody>
      </table></div></div>
    </div>
  )
}