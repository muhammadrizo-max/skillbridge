import { User, Skill, TeachingSkill, LearningSkill, MatchResult, Connection, Message, ChatConversation, Rating, Report, Notification, AdminStats } from './types'

// Re-exports from constants
export { APP_NAME, APP_DESCRIPTION, ROUTES, SKILL_CATEGORIES, SKILL_LEVELS, CITIES, LANGUAGES, REPORT_REASONS } from './constants'

// ============ USERS ============
export const mockUsers: User[] = [
  { id:'1', fullName:'Aziz Karimov', username:'aziz_dev', email:'aziz@example.com', avatar:'https://i.pravatar.cc/150?u=aziz', bio:"Full-stack dasturchi. 5 yillik tajriba. React va Node.js bo'yicha mutaxassis.", country:"O'zbekiston", city:'Toshkent', languages:["O'zbek",'Rus','Ingliz'], joinDate:'2024-09-15', role:'user', isVerified:true, isSuspended:false, completedSessions:24, rating:4.8, ratingCount:18 },
  { id:'2', fullName:'Nilufar Rashidova', username:'nilufar_design', email:'nilufar@example.com', avatar:'https://i.pravatar.cc/150?u=nilufar', bio:'UI/UX dizayner. Figma va Adobe Creative Suite bo\'yicha professional.', country:"O'zbekiston", city:'Samarqand', languages:["O'zbek",'Rus','Ingliz'], joinDate:'2024-10-02', role:'user', isVerified:true, isSuspended:false, completedSessions:15, rating:4.9, ratingCount:12 },
  { id:'3', fullName:'Jasur Toshmatov', username:'jasur_eng', email:'jasur@example.com', avatar:'https://i.pravatar.cc/150?u=jasur', bio:"Ingliz tili o'qituvchisi. IELTS 8.0. 3 yillik tajriba.", country:"O'zbekiston", city:'Buxoro', languages:["O'zbek",'Ingliz','Turk'], joinDate:'2024-11-10', role:'user', isVerified:true, isSuspended:false, completedSessions:31, rating:4.7, ratingCount:22 },
  { id:'4', fullName:'Malika Usmonova', username:'malika_music', email:'malika@example.com', avatar:'https://i.pravatar.cc/150?u=malika', bio:'Professional pianinochi. Konservatoriya bitiruvchisi.', country:"O'zbekiston", city:'Toshkent', languages:["O'zbek",'Rus'], joinDate:'2024-12-01', role:'user', isVerified:true, isSuspended:false, completedSessions:8, rating:5.0, ratingCount:6 },
  { id:'5', fullName:'Sardor Alimov', username:'sardor_biz', email:'sardor@example.com', avatar:'https://i.pravatar.cc/150?u=sardor', bio:'Tadbirkorlik va marketing bo\'yicha maslahatchi. MBA.', country:"O'zbekiston", city:'Toshkent', languages:["O'zbek",'Rus','Ingliz'], joinDate:'2024-08-20', role:'user', isVerified:true, isSuspended:false, completedSessions:19, rating:4.6, ratingCount:14 },
  { id:'6', fullName:'Dilnoza Karimova', username:'dilnoza_photo', email:'dilnoza@example.com', avatar:'https://i.pravatar.cc/150?u=dilnoza', bio:'Professional fotograf va videograf.', country:"O'zbekiston", city:"Farg'ona", languages:["O'zbek",'Rus'], joinDate:'2025-01-05', role:'user', isVerified:true, isSuspended:false, completedSessions:5, rating:4.5, ratingCount:4 },
  { id:'7', fullName:'Otabek Nazarov', username:'otabek_math', email:'otabek@example.com', avatar:'https://i.pravatar.cc/150?u=otabek', bio:"Matematika o'qituvchisi.", country:"O'zbekiston", city:'Namangan', languages:["O'zbek",'Rus'], joinDate:'2025-02-14', role:'user', isVerified:false, isSuspended:false, completedSessions:12, rating:4.4, ratingCount:8 },
  { id:'8', fullName:'Zilola Mirzoeva', username:'zilola_cook', email:'zilola@example.com', avatar:'https://i.pravatar.cc/150?u=zilola', bio:"Oshpazlik san'ati.", country:"O'zbekiston", city:'Toshkent', languages:["O'zbek",'Rus','Turk'], joinDate:'2025-03-01', role:'user', isVerified:true, isSuspended:false, completedSessions:7, rating:4.9, ratingCount:5 },
  { id:'admin1', fullName:'Admin Foydalanuvchi', username:'admin', email:'admin@skillbridge.uz', avatar:'https://i.pravatar.cc/150?u=admin', bio:'SkillBridge administratori.', country:"O'zbekiston", city:'Toshkent', languages:["O'zbek",'Rus','Ingliz'], joinDate:'2024-01-01', role:'admin', isVerified:true, isSuspended:false, completedSessions:0, rating:0, ratingCount:0 },
]
export const currentUser: User = mockUsers[0]

// ============ SKILLS ============
export const allSkills: Skill[] = [
  { id:'s1', name:'JavaScript', category:'Dasturlash' }, { id:'s2', name:'React', category:'Dasturlash' },
  { id:'s3', name:'Python', category:'Dasturlash' }, { id:'s4', name:'Node.js', category:'Dasturlash' },
  { id:'s5', name:'TypeScript', category:'Dasturlash' }, { id:'s6', name:'Ingliz tili', category:'Tillar' },
  { id:'s7', name:'Rus tili', category:'Tillar' }, { id:'s8', name:'Turk tili', category:'Tillar' },
  { id:'s9', name:'Koreya tili', category:'Tillar' }, { id:'s10', name:'Figma', category:'Dizayn' },
  { id:'s11', name:'Photoshop', category:'Dizayn' }, { id:'s12', name:'UI/UX Dizayn', category:'Dizayn' },
  { id:'s13', name:'Grafik Dizayn', category:'Dizayn' }, { id:'s14', name:'SMM', category:'Marketing' },
  { id:'s15', name:'SEO', category:'Marketing' }, { id:'s16', name:'Kontent Marketing', category:'Marketing' },
  { id:'s17', name:'Biznes Reja', category:'Biznes' }, { id:'s18', name:'Moliyaviy Tahlil', category:'Moliya' },
  { id:'s19', name:'Pianino', category:'Musiqa' }, { id:'s20', name:'Gitara', category:'Musiqa' },
  { id:'s21', name:'Vokal', category:'Musiqa' }, { id:'s22', name:'Matematika', category:"Ta'lim" },
  { id:'s23', name:'Fizika', category:"Ta'lim" }, { id:'s24', name:'Biologiya', category:"Ta'lim" },
  { id:'s25', name:'Fotografiya', category:'Dizayn' }, { id:'s26', name:'Video Montaj', category:'Dizayn' },
  { id:'s27', name:'Yoga', category:"Sog'liq" }, { id:'s28', name:'Fitness', category:'Sport' },
  { id:'s29', name:'Shaxmat', category:'Sport' }, { id:'s30', name:'Oshpazlik', category:"Ta'lim" },
]

export const mockTeachingSkills: TeachingSkill[] = [
  { id:'ts1', skill:allSkills[0], level:"Yuqori", description:"JavaScript asoslari va ilg'or mavzular" },
  { id:'ts2', skill:allSkills[1], level:'Professional', description:'React hooks, context, performance' },
  { id:'ts3', skill:allSkills[4], level:"O'rta", description:'TypeScript bilan ishlash' },
]

export const mockLearningSkills: LearningSkill[] = [
  { id:'ls1', skill:allSkills[9], preferredLevel:"O'rta" },
  { id:'ls2', skill:allSkills[11], preferredLevel:"Boshlang'ich" },
  { id:'ls3', skill:allSkills[7] },
]

// ============ CONNECTIONS ============
export const mockConnections: Connection[] = [
  { id:'c1', senderId:'1', receiverId:'2', status:'accepted', createdAt:'2025-06-20T09:00:00Z', sender:mockUsers[0], receiver:mockUsers[1] },
  { id:'c2', senderId:'1', receiverId:'3', status:'accepted', createdAt:'2025-06-25T11:00:00Z', sender:mockUsers[0], receiver:mockUsers[2] },
  { id:'c3', senderId:'4', receiverId:'1', status:'pending', createdAt:'2025-06-29T08:00:00Z', sender:mockUsers[3], receiver:mockUsers[0] },
  { id:'c4', senderId:'5', receiverId:'1', status:'pending', createdAt:'2025-06-30T10:00:00Z', sender:mockUsers[4], receiver:mockUsers[0] },
  { id:'c5', senderId:'1', receiverId:'6', status:'rejected', createdAt:'2025-06-15T14:00:00Z', sender:mockUsers[0], receiver:mockUsers[5] },
]

// ============ MESSAGES ============
export const mockMessages: Message[] = [
  { id:'m1', connectionId:'c1', senderId:'2', content:"Assalomu alaykum! React bo'yicha savolim bor edi.", type:'text', timestamp:'2025-06-28T10:30:00Z', isRead:true },
  { id:'m2', connectionId:'c1', senderId:'1', content:"Va alaykum assalom! Albatta, qanday savol?", type:'text', timestamp:'2025-06-28T10:32:00Z', isRead:true },
  { id:'m3', connectionId:'c1', senderId:'2', content:"useEffect hook qanday ishlaydi?", type:'text', timestamp:'2025-06-28T10:35:00Z', isRead:true },
  { id:'m4', connectionId:'c1', senderId:'1', content:"useEffect — React hook bo'lib, side effectlarni bajarish uchun ishlatiladi.", type:'text', timestamp:'2025-06-28T10:40:00Z', isRead:true },
  { id:'m5', connectionId:'c1', senderId:'2', content:"Tushunarli! Rahmat katta", type:'text', timestamp:'2025-06-28T10:42:00Z', isRead:false },
  { id:'m6', connectionId:'c2', senderId:'3', content:"Salom! Ingliz tili darslari haqida gaplashmoqchi edim.", type:'text', timestamp:'2025-06-29T14:00:00Z', isRead:true },
  { id:'m7', connectionId:'c2', senderId:'1', content:"Salom Jasur! Qachon boshlashimiz mumkin?", type:'text', timestamp:'2025-06-29T14:05:00Z', isRead:true },
  { id:'m8', connectionId:'c2', senderId:'3', content:"Keyingi haftadan boshlasak bo'ladimi?", type:'text', timestamp:'2025-06-29T14:10:00Z', isRead:false },
]

export const mockConversations: ChatConversation[] = [
  { id:'conv1', connectionId:'c1', otherUser:mockUsers[1], lastMessage:mockMessages[4], unreadCount:1 },
  { id:'conv2', connectionId:'c2', otherUser:mockUsers[2], lastMessage:mockMessages[7], unreadCount:1 },
]

// ============ RATINGS ============
export const mockRatings: Rating[] = [
  { id:'r1', sessionId:'sess1', raterId:'2', ratedId:'1', score:5, review:"Ajoyib o'qituvchi!", createdAt:'2025-06-21T16:00:00Z', rater:mockUsers[1], rated:mockUsers[0] },
  { id:'r2', sessionId:'sess2', raterId:'3', ratedId:'1', score:4, review:"Yaxshi dars.", createdAt:'2025-06-26T18:00:00Z', rater:mockUsers[2], rated:mockUsers[0] },
  { id:'r3', sessionId:'sess3', raterId:'1', ratedId:'2', score:5, review:"Nilufar dizayn bo'yicha bilimli.", createdAt:'2025-06-22T15:00:00Z', rater:mockUsers[0], rated:mockUsers[1] },
  { id:'r4', sessionId:'sess4', raterId:'1', ratedId:'3', score:5, review:"Jasurning darslari samarali.", createdAt:'2025-06-27T19:00:00Z', rater:mockUsers[0], rated:mockUsers[2] },
  { id:'r5', sessionId:'sess5', raterId:'5', ratedId:'4', score:5, review:"Malikaning pianino darslari ajoyib!", createdAt:'2025-06-28T17:00:00Z', rater:mockUsers[4], rated:mockUsers[3] },
]

// ============ NOTIFICATIONS ============
export const mockNotifications: Notification[] = [
  { id:'n1', userId:'1', type:'connection_request', title:"Yangi so'rov", message:"Malika Usmonova sizga ulanish so'rovi yubordi", isRead:false, createdAt:'2025-06-29T08:00:00Z', link:'/connections' },
  { id:'n2', userId:'1', type:'new_message', title:'Yangi xabar', message:"Nilufar Rashidova sizga xabar yubordi", isRead:false, createdAt:'2025-06-28T10:42:00Z', link:'/chat/c1' },
  { id:'n3', userId:'1', type:'new_rating', title:'Yangi baho', message:"Jasur sizga 4 yulduz baho berdi", isRead:true, createdAt:'2025-06-26T18:00:00Z', link:'/ratings' },
  { id:'n4', userId:'1', type:'connection_accepted', title:"Qabul qilindi", message:"Jasur ulanishni qabul qildi", isRead:true, createdAt:'2025-06-25T12:00:00Z', link:'/connections' },
  { id:'n5', userId:'1', type:'connection_request', title:"Yangi so'rov", message:"Sardor Alimov sizga so'rov yubordi", isRead:false, createdAt:'2025-06-30T10:00:00Z', link:'/connections' },
]

// ============ REPORTS ============
export const mockReports: Report[] = [
  { id:'rep1', reporterId:'3', reportedId:'5', reason:'Spam', description:"Reklama xabarlarini ko'p yuboryapti.", status:"ko'rib chiqilmoqda", createdAt:'2025-06-28T12:00:00Z', reporter:mockUsers[2], reported:mockUsers[4] },
  { id:'rep2', reporterId:'2', reportedId:'7', reason:'Soxta profil', description:"Profil haqiqiy emasdek.", status:"ko'rib chiqilmoqda", createdAt:'2025-06-29T09:00:00Z', reporter:mockUsers[1], reported:mockUsers[6] },
  { id:'rep3', reporterId:'4', reportedId:'6', reason:'Xulq-atvor muammosi', description:"Noto'g'ri so'zlar.", status:'hal qilindi', createdAt:'2025-06-25T15:00:00Z', reporter:mockUsers[3], reported:mockUsers[5] },
]

// ============ ADMIN STATS ============
export const mockAdminStats: AdminStats = {
  totalUsers:1247, activeUsers:892, totalConnections:3456, totalMessages:28934,
  totalRatings:1876, totalReports:23, pendingReports:2, newUsersToday:14, newUsersThisWeek:87,
  topSkills: [
    { name:'Ingliz tili', count:342 }, { name:'JavaScript', count:256 }, { name:'Figma', count:198 },
    { name:'React', count:187 }, { name:'Rus tili', count:165 }, { name:'Python', count:143 },
    { name:'UI/UX Dizayn', count:129 }, { name:'Matematika', count:118 },
  ],
  userGrowth: [
    { month:'Yan', count:45 }, { month:'Fev', count:89 }, { month:'Mar', count:156 },
    { month:'Apr', count:234 }, { month:'May', count:378 }, { month:'Iyun', count:567 }, { month:'Iyul', count:1247 },
  ],
}

// ============ MATCHES ============
export const mockMatches: MatchResult[] = [
  { user:mockUsers[1], matchPercentage:92, sharedTeachSkills:[allSkills[9],allSkills[11]], sharedLearnSkills:[allSkills[0],allSkills[1]], sharedLanguages:["O'zbek",'Rus','Ingliz'] },
  { user:mockUsers[2], matchPercentage:85, sharedTeachSkills:[allSkills[5]], sharedLearnSkills:[allSkills[0]], sharedLanguages:["O'zbek",'Ingliz'] },
  { user:mockUsers[3], matchPercentage:71, sharedTeachSkills:[allSkills[18]], sharedLearnSkills:[allSkills[1]], sharedLanguages:["O'zbek",'Rus'] },
  { user:mockUsers[4], matchPercentage:65, sharedTeachSkills:[allSkills[16]], sharedLearnSkills:[allSkills[0],allSkills[4]], sharedLanguages:["O'zbek",'Rus','Ingliz'] },
  { user:mockUsers[5], matchPercentage:58, sharedTeachSkills:[allSkills[24],allSkills[25]], sharedLearnSkills:[allSkills[1]], sharedLanguages:["O'zbek",'Rus'] },
  { user:mockUsers[6], matchPercentage:45, sharedTeachSkills:[allSkills[21]], sharedLearnSkills:[allSkills[2]], sharedLanguages:["O'zbek",'Rus'] },
  { user:mockUsers[7], matchPercentage:38, sharedTeachSkills:[allSkills[29]], sharedLearnSkills:[allSkills[9]], sharedLanguages:["O'zbek",'Rus','Turk'] },
]
