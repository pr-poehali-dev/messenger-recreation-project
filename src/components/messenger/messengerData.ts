export type Tab = "chats" | "statuses" | "calls" | "contacts" | "profile" | "settings";

export const CONTACTS = [
  { id: 1, name: "Алиса Морозова", status: "online", avatar: "АМ", color: "from-violet-500 to-cyan-400", lastMsg: "Увидимся завтра! 🔥", time: "12:34", unread: 3, typing: false },
  { id: 2, name: "Дмитрий Волков", status: "online", avatar: "ДВ", color: "from-pink-500 to-violet-500", lastMsg: "Отличная идея, давай обсудим", time: "11:58", unread: 0, typing: true },
  { id: 3, name: "Команда Vibe 🚀", status: "group", avatar: "TV", color: "from-cyan-500 to-emerald-400", lastMsg: "Михаил: новый дизайн готов!", time: "10:20", unread: 12, typing: false },
  { id: 4, name: "Мария Иванова", status: "away", avatar: "МИ", color: "from-amber-400 to-orange-500", lastMsg: "Спасибо за помощь 💙", time: "вчера", unread: 0, typing: false },
  { id: 5, name: "Dev Channel", status: "group", avatar: "DC", color: "from-emerald-400 to-cyan-500", lastMsg: "Новый релиз в production", time: "вчера", unread: 5, typing: false },
  { id: 6, name: "Никита Смирнов", status: "offline", avatar: "НС", color: "from-slate-400 to-slate-600", lastMsg: "Ок, понял тебя", time: "пн", unread: 0, typing: false },
];

export const MESSAGES = [
  { id: 1, from: "them", text: "Привет! Как дела? Работаешь над новым проектом?", time: "11:20", avatar: "АМ", color: "from-violet-500 to-cyan-400", reaction: "" },
  { id: 2, from: "me", text: "Привет, Алиса! Да, строю мессенджер нового поколения 🚀 Там будут реальные звонки, статусы и куча всего", time: "11:22", reaction: "🔥" },
  { id: 3, from: "them", text: "Вау, звучит невероятно! Это то, о чём ты рассказывал на прошлой неделе?", time: "11:24", avatar: "АМ", color: "from-violet-500 to-cyan-400", reaction: "" },
  { id: 4, from: "me", text: "Именно! Уже есть чаты, статусы, звонки. Скоро покажу бету 🎯", time: "11:25", reaction: "" },
  { id: 5, from: "them", text: "Не могу дождаться! Это будет бомба 💜", time: "11:26", avatar: "АМ", color: "from-violet-500 to-cyan-400", reaction: "💜" },
  { id: 6, from: "me", text: "Увидимся завтра, расскажу подробнее!", time: "12:30", reaction: "" },
];

export const STATUSES = [
  { id: 1, name: "Моя история", avatar: "ЯМ", color: "from-violet-500 to-cyan-400", isMyStory: true, viewed: false },
  { id: 2, name: "Алиса", avatar: "АМ", color: "from-pink-500 to-violet-500", viewed: false, isMyStory: false },
  { id: 3, name: "Дмитрий", avatar: "ДВ", color: "from-cyan-400 to-emerald-400", viewed: false, isMyStory: false },
  { id: 4, name: "Команда", avatar: "TV", color: "from-amber-400 to-orange-500", viewed: true, isMyStory: false },
  { id: 5, name: "Мария", avatar: "МИ", color: "from-emerald-400 to-cyan-500", viewed: true, isMyStory: false },
];

export const CALLS = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", color: "from-violet-500 to-cyan-400", type: "incoming", answered: true, time: "сегодня, 09:12", duration: "24 мин" },
  { id: 2, name: "Дмитрий Волков", avatar: "ДВ", color: "from-pink-500 to-violet-500", type: "outgoing", answered: true, time: "вчера, 18:45", duration: "7 мин" },
  { id: 3, name: "Команда Vibe", avatar: "TV", color: "from-cyan-500 to-emerald-400", type: "incoming", answered: false, time: "вчера, 15:30", duration: "" },
  { id: 4, name: "Мария Иванова", avatar: "МИ", color: "from-amber-400 to-orange-500", type: "outgoing", answered: true, time: "пн, 12:00", duration: "2 мин" },
];
