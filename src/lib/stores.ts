import { create } from 'zustand'
import type { User, Notification } from './types'
import { currentUser, mockNotifications } from './mock'

// -- Auth Store --
interface AuthState {
  user: User | null; isAuthenticated: boolean; isLoading: boolean
  login: (user: User) => void; logout: () => void; updateUser: (data: Partial<User>) => void
  setLoading: (v: boolean) => void
}
export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser, isAuthenticated: true, isLoading: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (data) => set((s) => ({ user: s.user ? { ...s.user, ...data } : null })),
  setLoading: (isLoading) => set({ isLoading }),
}))

// -- UI Store --
export interface Toast { id: string; type: 'success'|'error'|'info'|'warning'; message: string }
interface UIState {
  sidebarOpen: boolean; mobileMenuOpen: boolean; toasts: Toast[]
  toggleSidebar: () => void; toggleMobileMenu: () => void; closeMobileMenu: () => void
  addToast: (t: Omit<Toast, 'id'>) => void; removeToast: (id: string) => void
}
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true, mobileMenuOpen: false, toasts: [],
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  addToast: (t) => set((s) => ({ toasts: [...s.toasts, { ...t, id: Date.now().toString() }] })),
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))