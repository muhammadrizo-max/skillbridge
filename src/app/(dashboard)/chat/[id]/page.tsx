'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Send, Image, Smile } from 'lucide-react'
import { Avatar, LoadingSpinner } from '@/components/ui'
import { MessageBubble } from '@/components/domain'
import { chatService } from '@/lib/services'
import { mockUsers, ROUTES } from '@/lib/mock'
import type { Message } from '@/lib/types'
import Link from 'next/link'

export default function ChatRoomPage() {
  const params = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const otherUser = mockUsers[1]

  useEffect(() => { (async () => { setMessages(await chatService.getMessages(params.id as string)); setLoading(false) })() }, [params.id])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async () => { if (!input.trim() || sending) return; setSending(true); setMessages((p) => [...p, await chatService.sendMessage(params.id as string, input.trim())]); setInput(''); setSending(false) }

  if (loading) return <LoadingSpinner size="lg" className="py-32" />

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center gap-4 pb-4 border-b border-surface-200">
        <Link href={ROUTES.chat} className="p-2 rounded-lg hover:bg-surface-100"><ArrowLeft className="w-5 h-5" /></Link>
        <Avatar src={otherUser.avatar} name={otherUser.fullName} size="sm" />
        <div><h2 className="font-medium">{otherUser.fullName}</h2><p className="text-xs text-green-600">Onlayn</p></div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        {messages.map((m) => <MessageBubble key={m.id} message={m} isOwn={m.senderId === '1'} />)}
        <div ref={endRef} />
      </div>
      <div className="pt-4 border-t border-surface-200">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400"><Image className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400"><Smile className="w-5 h-5" /></button>
          <input type="text" placeholder="Xabar yozing..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className="input-base flex-1" />
          <button onClick={handleSend} disabled={!input.trim() || sending} className="p-3 rounded-xl bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50">
            {sending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}