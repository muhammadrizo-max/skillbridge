export interface User {
  id: string; fullName: string; username: string; email: string; avatar: string;
  bio: string; country: string; city: string; languages: string[]; joinDate: string;
  role: 'user' | 'admin'; isVerified: boolean; isSuspended: boolean;
  completedSessions: number; rating: number; ratingCount: number;
}

export interface Skill { id: string; name: string; category: SkillCategory }
export type SkillCategory = 'Tillar'|'Dasturlash'|'Dizayn'|'Marketing'|'Biznes'|'Musiqa'|"Ta'lim"|'Moliya'|"Sog'liq"|'Sport'
export type SkillLevel = "Boshlang'ich"|"O'rta"|'Yuqori'|'Professional'

export interface TeachingSkill { id: string; skill: Skill; level: SkillLevel; description: string }
export interface LearningSkill { id: string; skill: Skill; preferredLevel?: SkillLevel }

export interface MatchResult {
  user: User; matchPercentage: number;
  sharedTeachSkills: Skill[]; sharedLearnSkills: Skill[]; sharedLanguages: string[];
}

export interface Connection {
  id: string; senderId: string; receiverId: string;
  status: ConnectionStatus; createdAt: string; sender?: User; receiver?: User;
}
export type ConnectionStatus = 'pending'|'accepted'|'rejected'|'cancelled'

export interface Message {
  id: string; connectionId: string; senderId: string; content: string;
  type: 'text'|'emoji'|'image'; timestamp: string; isRead: boolean;
}

export interface ChatConversation {
  id: string; connectionId: string; otherUser: User; lastMessage: Message; unreadCount: number;
}

export interface Rating {
  id: string; sessionId: string; raterId: string; ratedId: string;
  score: number; review: string; createdAt: string; rater?: User; rated?: User;
}

export interface Report {
  id: string; reporterId: string; reportedId: string;
  reason: 'Spam'|'Soxta profil'|'Xulq-atvor muammosi'|'Boshqa';
  description: string; status: "ko'rib chiqilmoqda"|"hal qilindi"|"rad etildi";
  createdAt: string; reporter?: User; reported?: User;
}

export interface Notification {
  id: string; userId: string;
  type: 'connection_accepted'|'new_message'|'new_rating'|'connection_request';
  title: string; message: string; isRead: boolean; createdAt: string; link?: string;
}

export interface AdminStats {
  totalUsers: number; activeUsers: number; totalConnections: number;
  totalMessages: number; totalRatings: number; totalReports: number;
  pendingReports: number; newUsersToday: number; newUsersThisWeek: number;
  topSkills: { name: string; count: number }[];
  userGrowth: { month: string; count: number }[];
}

export interface PaginatedResponse<T> {
  data: T[]; total: number; page: number; limit: number; totalPages: number;
}