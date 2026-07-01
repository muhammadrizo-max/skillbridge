import { simulateDelay } from './utils'
import { currentUser, mockUsers, allSkills, mockTeachingSkills, mockLearningSkills, mockConnections, mockMessages, mockConversations, mockRatings, mockNotifications, mockReports, mockAdminStats, mockMatches } from './mock'
import type { User, TeachingSkill, LearningSkill, Skill, MatchResult, Connection, Message, ChatConversation, Rating, Report, Notification, AdminStats, PaginatedResponse } from './types'

export const authService = {
  login: (d: { emailOrUsername: string; password: string }) => simulateDelay({ user: currentUser, token: 'mock-token' }),
  register: (d: { fullName: string; username: string; email: string; password: string }) => simulateDelay({ user: { ...currentUser, ...d, id: 'new-' + Date.now() }, token: 'mock-token' }),
  forgotPassword: (email: string) => simulateDelay({ message: "Parolni tiklash havolasi emailingizga yuborildi" }),
  verifyEmail: (code: string) => simulateDelay({ message: "Email muvaffaqiyatli tasdiqlandi" }),
  logout: () => simulateDelay(undefined, 200),
  getCurrentUser: () => simulateDelay(currentUser),
}

export const userService = {
  getProfile: (id: string) => simulateDelay(mockUsers.find((u) => u.id === id) || currentUser),
  updateProfile: (data: Partial<User>) => simulateDelay({ ...currentUser, ...data }),
  searchUsers: (query: string, filters?: { city?: string; language?: string }): Promise<PaginatedResponse<User>> => {
    let f = mockUsers.filter((u) => u.role === 'user')
    if (query) { const q = query.toLowerCase(); f = f.filter((u) => u.fullName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)) }
    if (filters?.city) f = f.filter((u) => u.city === filters.city)
    if (filters?.language) f = f.filter((u) => u.languages.includes(filters.language!))
    return simulateDelay({ data: f, total: f.length, page: 1, limit: 20, totalPages: 1 })
  },
}

export const skillService = {
  getTeachingSkills: () => simulateDelay(mockTeachingSkills),
  getLearningSkills: () => simulateDelay(mockLearningSkills),
  getAllSkills: () => simulateDelay(allSkills),
  addTeachingSkill: (s: Omit<TeachingSkill, 'id'>) => simulateDelay({ ...s, id: 'ts-' + Date.now() }),
  removeTeachingSkill: (id: string) => simulateDelay(undefined),
  addLearningSkill: (s: Omit<LearningSkill, 'id'>) => simulateDelay({ ...s, id: 'ls-' + Date.now() }),
  removeLearningSkill: (id: string) => simulateDelay(undefined),
}

export const matchingService = {
  getMatches: (): Promise<MatchResult[]> => simulateDelay(mockMatches),
}

export const connectionService = {
  getConnections: () => simulateDelay(mockConnections),
  getPendingRequests: () => simulateDelay(mockConnections.filter((c) => c.status === 'pending')),
  sendRequest: (receiverId: string) => simulateDelay({ id: 'c-' + Date.now(), senderId: '1', receiverId, status: 'pending' as const, createdAt: new Date().toISOString() }),
  acceptRequest: (id: string) => simulateDelay({ ...mockConnections.find((c) => c.id === id)!, status: 'accepted' as const }),
  rejectRequest: (id: string) => simulateDelay({ ...mockConnections.find((c) => c.id === id)!, status: 'rejected' as const }),
  cancelRequest: (id: string) => simulateDelay({ ...mockConnections.find((c) => c.id === id)!, status: 'cancelled' as const }),
}

export const chatService = {
  getConversations: () => simulateDelay(mockConversations),
  getMessages: (connectionId: string) => simulateDelay(mockMessages.filter((m) => m.connectionId === connectionId)),
  sendMessage: (connectionId: string, content: string, type: 'text'|'emoji'|'image' = 'text'): Promise<Message> =>
    simulateDelay({ id: 'm-' + Date.now(), connectionId, senderId: '1', content, type, timestamp: new Date().toISOString(), isRead: false }),
}

export const ratingService = {
  getRatings: () => simulateDelay(mockRatings),
  getRatingsForUser: (userId: string) => simulateDelay(mockRatings.filter((r) => r.ratedId === userId)),
  submitRating: (sessionId: string, ratedId: string, score: number, review: string): Promise<Rating> =>
    simulateDelay({ id: 'r-' + Date.now(), sessionId, raterId: '1', ratedId, score, review, createdAt: new Date().toISOString() }),
}

export const reportService = {
  getReports: () => simulateDelay(mockReports),
  submitReport: (reportedId: string, reason: string, description: string): Promise<Report> =>
    simulateDelay({ id: 'rep-' + Date.now(), reporterId: '1', reportedId, reason: reason as Report['reason'], description, status: "ko'rib chiqilmoqda", createdAt: new Date().toISOString() }),
}

export const adminService = {
  getStats: () => simulateDelay(mockAdminStats),
  getUsers: () => simulateDelay(mockUsers.filter((u) => u.role === 'user')),
  suspendUser: (id: string) => simulateDelay({ ...mockUsers.find((u) => u.id === id)!, isSuspended: true }),
  unsuspendUser: (id: string) => simulateDelay({ ...mockUsers.find((u) => u.id === id)!, isSuspended: false }),
  deleteUser: (id: string) => simulateDelay(undefined),
  getSkills: () => simulateDelay(allSkills),
  addSkill: (s: Omit<Skill, 'id'>) => simulateDelay({ ...s, id: 's-' + Date.now() }),
  deleteSkill: (id: string) => simulateDelay(undefined),
  getReports: () => simulateDelay(mockReports),
  resolveReport: (id: string) => simulateDelay({ ...mockReports.find((r) => r.id === id)!, status: 'hal qilindi' as const }),
  getRatings: () => simulateDelay(mockRatings),
  deleteRating: (id: string) => simulateDelay(undefined),
  getConnections: () => simulateDelay(mockConnections),
  getSettings: () => simulateDelay({ siteName: 'SkillBridge', siteDescription: "Bilim almashish platformasi" }),
}