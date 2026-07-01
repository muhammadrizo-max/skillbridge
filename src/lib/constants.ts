export const APP_NAME = 'SkillBridge'
export const APP_DESCRIPTION = "Bilim almashish platformasi — o'rgatish va o'rganishni xohlovchilarni bog'laydi"

export const ROUTES = {
  home: '/', login: '/login', register: '/register', forgotPassword: '/forgot-password',
  verifyEmail: '/verify-email', dashboard: '/dashboard', search: '/search',
  matching: '/matching', profile: '/profile', profileEdit: '/profile/edit',
  profileView: (id: string) => `/profile/${id}`, connections: '/connections',
  chat: '/chat', chatView: (id: string) => `/chat/${id}`,
  ratings: '/ratings', notifications: '/notifications', settings: '/settings',
  admin: {
    login: '/admin/login', dashboard: '/admin/dashboard', users: '/admin/users',
    skills: '/admin/skills', reports: '/admin/reports', ratings: '/admin/ratings',
    connections: '/admin/connections', settings: '/admin/settings',
  },
} as const

export const SKILL_CATEGORIES = ['Tillar','Dasturlash','Dizayn','Marketing','Biznes','Musiqa',"Ta'lim",'Moliya',"Sog'liq",'Sport'] as const
export const SKILL_LEVELS = ["Boshlang'ich","O'rta",'Yuqori','Professional'] as const
export const CITIES = ['Toshkent','Samarqand','Buxoro',"Farg'ona",'Namangan','Andijon','Xiva','Nukus','Qarshi','Termiz','Jizzax','Navoiy','Guliston','Urganch'] as const
export const LANGUAGES = ["O'zbek",'Rus','Ingliz','Turk','Arab','Xitoy','Koreya','Yapon','Nemis','Fransuz'] as const
export const REPORT_REASONS = ['Spam','Soxta profil','Xulq-atvor muammosi','Boshqa'] as const