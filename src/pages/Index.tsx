import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  { id: 1, name: "Алиса Морозова", status: "online", avatar: "АМ", color: "from-violet-500 to-cyan-400", lastMsg: "Увидимся завтра! 🔥", time: "12:34", unread: 3, typing: false },
  { id: 2, name: "Дмитрий Волков", status: "online", avatar: "ДВ", color: "from-pink-500 to-violet-500", lastMsg: "Отличная идея, давай обсудим", time: "11:58", unread: 0, typing: true },
  { id: 3, name: "Команда Vibe 🚀", status: "group", avatar: "TV", color: "from-cyan-500 to-emerald-400", lastMsg: "Михаил: новый дизайн готов!", time: "10:20", unread: 12, typing: false },
  { id: 4, name: "Мария Иванова", status: "away", avatar: "МИ", color: "from-amber-400 to-orange-500", lastMsg: "Спасибо за помощь 💙", time: "вчера", unread: 0, typing: false },
  { id: 5, name: "Dev Channel", status: "group", avatar: "DC", color: "from-emerald-400 to-cyan-500", lastMsg: "Новый релиз в production", time: "вчера", unread: 5, typing: false },
  { id: 6, name: "Никита Смирнов", status: "offline", avatar: "НС", color: "from-slate-400 to-slate-600", lastMsg: "Ок, понял тебя", time: "пн", unread: 0, typing: false },
];

const MESSAGES = [
  { id: 1, from: "them", text: "Привет! Как дела? Работаешь над новым проектом?", time: "11:20", avatar: "АМ", color: "from-violet-500 to-cyan-400", reaction: "" },
  { id: 2, from: "me", text: "Привет, Алиса! Да, строю мессенджер нового поколения 🚀 Там будут реальные звонки, статусы и куча всего", time: "11:22", reaction: "🔥" },
  { id: 3, from: "them", text: "Вау, звучит невероятно! Это то, о чём ты рассказывал на прошлой неделе?", time: "11:24", avatar: "АМ", color: "from-violet-500 to-cyan-400", reaction: "" },
  { id: 4, from: "me", text: "Именно! Уже есть чаты, статусы, звонки. Скоро покажу бету 🎯", time: "11:25", reaction: "" },
  { id: 5, from: "them", text: "Не могу дождаться! Это будет бомба 💜", time: "11:26", avatar: "АМ", color: "from-violet-500 to-cyan-400", reaction: "💜" },
  { id: 6, from: "me", text: "Увидимся завтра, расскажу подробнее!", time: "12:30", reaction: "" },
];

const STATUSES = [
  { id: 1, name: "Моя история", avatar: "ЯМ", color: "from-violet-500 to-cyan-400", isMyStory: true, viewed: false },
  { id: 2, name: "Алиса", avatar: "АМ", color: "from-pink-500 to-violet-500", viewed: false, isMyStory: false },
  { id: 3, name: "Дмитрий", avatar: "ДВ", color: "from-cyan-400 to-emerald-400", viewed: false, isMyStory: false },
  { id: 4, name: "Команда", avatar: "TV", color: "from-amber-400 to-orange-500", viewed: true, isMyStory: false },
  { id: 5, name: "Мария", avatar: "МИ", color: "from-emerald-400 to-cyan-500", viewed: true, isMyStory: false },
];

const CALLS = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", color: "from-violet-500 to-cyan-400", type: "incoming", answered: true, time: "сегодня, 09:12", duration: "24 мин" },
  { id: 2, name: "Дмитрий Волков", avatar: "ДВ", color: "from-pink-500 to-violet-500", type: "outgoing", answered: true, time: "вчера, 18:45", duration: "7 мин" },
  { id: 3, name: "Команда Vibe", avatar: "TV", color: "from-cyan-500 to-emerald-400", type: "incoming", answered: false, time: "вчера, 15:30", duration: "" },
  { id: 4, name: "Мария Иванова", avatar: "МИ", color: "from-amber-400 to-orange-500", type: "outgoing", answered: true, time: "пн, 12:00", duration: "2 мин" },
];

type Tab = "chats" | "statuses" | "calls" | "contacts" | "profile" | "settings";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsSection, setSettingsSection] = useState("notifications");

  const activeChatData = CONTACTS.find(c => c.id === activeChat);
  const filteredContacts = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-mesh overflow-hidden font-rubik">
      {/* Sidebar Navigation */}
      <div className="flex flex-col items-center w-16 py-4 gap-1 border-r border-white/5 bg-black/40 backdrop-blur-xl z-10">
        <div className="mb-4 w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-lg neon-glow">
          <span className="text-white font-golos font-black text-base">V</span>
        </div>
        {[
          { key: "chats", icon: "MessageCircle", label: "Чаты" },
          { key: "statuses", icon: "CircleDot", label: "Статусы" },
          { key: "calls", icon: "Phone", label: "Звонки" },
          { key: "contacts", icon: "Users", label: "Контакты" },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key as Tab)}
            title={item.label}
            className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200
              ${activeTab === item.key
                ? "bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-violet-400 neon-glow"
                : "text-white/30 hover:text-white/70 hover:bg-white/5"}`}
          >
            <Icon name={item.icon} size={20} />
            {item.key === "chats" && CONTACTS.reduce((s, c) => s + c.unread, 0) > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                {CONTACTS.reduce((s, c) => s + c.unread, 0)}
              </span>
            )}
          </button>
        ))}
        <div className="flex-1" />
        {[
          { key: "profile", icon: "UserCircle", label: "Профиль" },
          { key: "settings", icon: "Settings", label: "Настройки" },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key as Tab)}
            title={item.label}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200
              ${activeTab === item.key
                ? "bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-violet-400 neon-glow"
                : "text-white/30 hover:text-white/70 hover:bg-white/5"}`}
          >
            <Icon name={item.icon} size={20} />
          </button>
        ))}
      </div>

      {/* Left Panel */}
      <div className="w-72 flex flex-col border-r border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="p-4 border-b border-white/5">
          <h1 className="font-golos font-bold text-xl gradient-text mb-3">
            {activeTab === "chats" && "Сообщения"}
            {activeTab === "statuses" && "Статусы"}
            {activeTab === "calls" && "Звонки"}
            {activeTab === "contacts" && "Контакты"}
            {activeTab === "profile" && "Мой профиль"}
            {activeTab === "settings" && "Настройки"}
          </h1>
          {(activeTab === "chats" || activeTab === "contacts") && (
            <div className="relative">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 placeholder-white/25 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* CHATS */}
          {activeTab === "chats" && (
            <div className="p-2 space-y-1">
              {filteredContacts.map((contact, idx) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveChat(contact.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200 animate-fade-in
                    ${activeChat === contact.id
                      ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/10 border border-violet-500/20"
                      : "hover:bg-white/5 border border-transparent"}`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                      {contact.avatar}
                    </div>
                    {contact.status === "online" && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black/80 animate-pulse-glow" />
                    )}
                    {contact.status === "away" && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-black/80" />
                    )}
                    {contact.status === "group" && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-violet-500 rounded-full border-2 border-black/80 flex items-center justify-center">
                        <Icon name="Users" size={7} className="text-white" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="text-sm font-semibold text-white/90 truncate">{contact.name}</span>
                      <span className="text-[10px] text-white/30 ml-2 flex-shrink-0">{contact.time}</span>
                    </div>
                    {contact.typing ? (
                      <span className="text-xs text-violet-400 flex items-center gap-1">
                        <span className="flex gap-0.5">
                          {[0, 1, 2].map(i => (
                            <span key={i} className="w-1 h-1 bg-violet-400 rounded-full animate-wave" style={{ animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </span>
                        печатает...
                      </span>
                    ) : (
                      <span className="text-xs text-white/35 truncate block">{contact.lastMsg}</span>
                    )}
                  </div>
                  {contact.unread > 0 && (
                    <span className="flex-shrink-0 min-w-5 h-5 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-[10px] text-white flex items-center justify-center px-1 font-bold">
                      {contact.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* STATUSES */}
          {activeTab === "statuses" && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {STATUSES.map((s, idx) => (
                  <div key={s.id} className="status-card rounded-2xl overflow-hidden cursor-pointer hover-lift" style={{ animationDelay: `${idx * 60}ms` }}>
                    <div className={`h-28 bg-gradient-to-br ${s.color} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {s.isMyStory ? (
                        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center z-10">
                          <Icon name="Plus" size={20} className="text-white" />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm z-10 ${!s.viewed ? "ring-2 ring-white ring-offset-1 ring-offset-transparent" : ""}`}>
                          {s.avatar}
                        </div>
                      )}
                      {!s.viewed && !s.isMyStory && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full z-10" />
                      )}
                    </div>
                    <div className="px-2 py-1.5 bg-black/60 backdrop-blur-sm">
                      <span className="text-xs text-white font-medium">{s.isMyStory ? "Добавить" : s.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass rounded-2xl p-3">
                <p className="text-xs text-white/40 text-center">Статусы исчезают через 24 часа</p>
              </div>
            </div>
          )}

          {/* CALLS */}
          {activeTab === "calls" && (
            <div className="p-2 space-y-1">
              {CALLS.map((call, idx) => (
                <div key={call.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${call.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {call.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white/90">{call.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Icon
                        name={call.type === "incoming" ? "PhoneIncoming" : "PhoneOutgoing"}
                        size={11}
                        className={call.answered ? "text-emerald-400" : "text-red-400"}
                      />
                      <span className={`text-xs ${call.answered ? "text-white/40" : "text-red-400"}`}>
                        {call.answered ? (call.duration || "") : "Пропущенный"}
                      </span>
                      <span className="text-xs text-white/25">· {call.time}</span>
                    </div>
                  </div>
                  <button className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
                    <Icon name="PhoneCall" size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* CONTACTS */}
          {activeTab === "contacts" && (
            <div className="p-2 space-y-1">
              <div className="px-3 py-2">
                <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">Онлайн · 2</p>
              </div>
              {filteredContacts.filter(c => c.status === "online").map((contact, idx) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {contact.avatar}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black/80" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white/90">{contact.name}</div>
                    <div className="text-xs text-emerald-400">в сети</div>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="w-8 h-8 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:text-violet-400 hover:bg-violet-500/10 transition-all">
                      <Icon name="MessageCircle" size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:text-emerald-400 hover:bg-emerald-500/10 transition-all">
                      <Icon name="Phone" size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="px-3 py-2 mt-2">
                <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">Остальные</p>
              </div>
              {filteredContacts.filter(c => c.status !== "online").map((contact, idx) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all animate-fade-in" style={{ animationDelay: `${(idx + 2) * 50}ms` }}>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {contact.avatar}
                    </div>
                    {contact.status === "away" && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-black/80" />}
                    {contact.status === "group" && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-violet-500 rounded-full border-2 border-black/80 flex items-center justify-center">
                        <Icon name="Users" size={7} className="text-white" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white/90">{contact.name}</div>
                    <div className="text-xs text-white/30">{contact.status === "away" ? "Отошёл" : contact.status === "group" ? "Группа" : "Не в сети"}</div>
                  </div>
                  <button className="w-8 h-8 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:text-violet-400 hover:bg-violet-500/10 transition-all">
                    <Icon name="MessageCircle" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE (sidebar) */}
          {activeTab === "profile" && (
            <div className="p-4 space-y-3">
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-xl neon-glow animate-float">
                    ЯМ
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="Camera" size={13} className="text-white" />
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="font-golos font-bold text-lg text-white">Яков Михайлов</h2>
                  <p className="text-sm text-violet-400">@yakm</p>
                </div>
              </div>
              {[
                { label: "Имя", value: "Яков Михайлов", icon: "User" },
                { label: "Телефон", value: "+7 (999) 123-45-67", icon: "Phone" },
                { label: "О себе", value: "Строю мессенджер 🚀", icon: "FileText" },
              ].map(field => (
                <div key={field.label} className="glass rounded-2xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/8 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Icon name={field.icon} size={15} className="text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-white/35 uppercase tracking-wider">{field.label}</div>
                    <div className="text-sm text-white/90">{field.value}</div>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-white/20" />
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS (sidebar) */}
          {activeTab === "settings" && (
            <div className="p-2 space-y-1">
              {[
                { key: "notifications", label: "Уведомления", icon: "Bell", desc: "Пуш и звуки" },
                { key: "privacy", label: "Приватность", icon: "Shield", desc: "Безопасность" },
                { key: "appearance", label: "Тема", icon: "Palette", desc: "Внешний вид" },
                { key: "storage", label: "Хранилище", icon: "Cloud", desc: "Файлы и медиа" },
                { key: "integrations", label: "Интеграции", icon: "Bot", desc: "Боты и команды" },
                { key: "devices", label: "Устройства", icon: "Smartphone", desc: "Сессии" },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setSettingsSection(item.key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200
                    ${settingsSection === item.key
                      ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/10 border border-violet-500/20"
                      : "hover:bg-white/5 border border-transparent"}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${settingsSection === item.key ? "bg-violet-500/30" : "bg-white/5"}`}>
                    <Icon name={item.icon} size={16} className={settingsSection === item.key ? "text-violet-400" : "text-white/40"} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90">{item.label}</div>
                    <div className="text-xs text-white/35">{item.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={14} className="ml-auto text-white/20" />
                </button>
              ))}
            </div>
          )}
        </div>

        {activeTab === "chats" && (
          <div className="p-3 border-t border-white/5">
            <button className="w-full h-10 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg neon-glow">
              <Icon name="Plus" size={16} />
              Новый чат
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeTab === "chats" && activeChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-xl">
              <div className="relative">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeChatData?.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                  {activeChatData?.avatar}
                </div>
                {activeChatData?.status === "online" && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black/80" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-white">{activeChatData?.name}</h2>
                <p className="text-xs text-emerald-400">
                  {activeChatData?.status === "online" ? "в сети" : activeChatData?.status === "group" ? "32 участника" : "недавно"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { icon: "Phone", hoverColor: "hover:text-emerald-400 hover:bg-emerald-500/15" },
                  { icon: "Video", hoverColor: "hover:text-cyan-400 hover:bg-cyan-500/15" },
                  { icon: "Search", hoverColor: "hover:text-white hover:bg-white/10" },
                  { icon: "MoreVertical", hoverColor: "hover:text-white hover:bg-white/10" },
                ].map(btn => (
                  <button key={btn.icon} className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 transition-all ${btn.hoverColor}`}>
                    <Icon name={btn.icon} size={18} />
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-xs text-white/25 px-3 py-1 glass rounded-full">Сегодня</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {MESSAGES.map((msg, idx) => (
                <div key={msg.id} className={`flex gap-3 message-bubble ${msg.from === "me" ? "flex-row-reverse" : ""}`} style={{ animationDelay: `${idx * 60}ms` }}>
                  {msg.from === "them" && (
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 self-end`}>
                      {msg.avatar}
                    </div>
                  )}
                  <div className="max-w-md relative">
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                      ${msg.from === "me"
                        ? "bg-gradient-to-br from-violet-500 to-violet-600 text-white rounded-br-sm shadow-lg"
                        : "glass text-white/90 rounded-bl-sm"}`}
                    >
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1.5 mt-1 ${msg.from === "me" ? "justify-end" : ""}`}>
                      <span className="text-[10px] text-white/25">{msg.time}</span>
                      {msg.from === "me" && <Icon name="CheckCheck" size={11} className="text-cyan-400" />}
                    </div>
                    {msg.reaction && (
                      <div className={`absolute -bottom-2 ${msg.from === "me" ? "left-2" : "right-2"} text-base bg-black/60 rounded-full px-1.5 py-0.5 border border-white/10`}>
                        {msg.reaction}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold">ДВ</div>
                <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-white/50 rounded-full animate-wave" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-xl">
              <div className="flex items-end gap-3">
                <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-violet-400 hover:bg-violet-500/10 transition-all flex-shrink-0">
                  <Icon name="Paperclip" size={18} />
                </button>
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Написать сообщение..."
                    rows={1}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/90 placeholder-white/25 focus:outline-none focus:border-violet-500/50 resize-none transition-all"
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setMessage(""); } }}
                  />
                </div>
                <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-amber-400 hover:bg-amber-500/10 transition-all flex-shrink-0">
                  <Icon name="Smile" size={18} />
                </button>
                <button className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-lg
                  ${message.trim()
                    ? "bg-gradient-to-br from-violet-500 to-cyan-400 text-white neon-glow hover:scale-105"
                    : "bg-gradient-to-br from-violet-500/40 to-cyan-400/40 text-white/60"}`}
                >
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Right panel for non-chat tabs */
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            {activeTab === "chats" && (
              <div className="text-center animate-slide-up">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-xl neon-glow animate-float">
                  <Icon name="MessageCircle" size={40} className="text-white" />
                </div>
                <h2 className="font-golos font-bold text-2xl gradient-text mb-2">Выберите чат</h2>
                <p className="text-white/35 text-sm">Начните общение или создайте новый диалог</p>
              </div>
            )}

            {activeTab === "statuses" && (
              <div className="w-full max-w-2xl animate-slide-up">
                <h2 className="font-golos font-bold text-2xl gradient-text mb-6 text-center">Последние истории</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[...STATUSES, ...STATUSES].slice(0, 6).map((s, idx) => (
                    <div key={idx} className="status-card rounded-3xl overflow-hidden cursor-pointer hover-lift shadow-xl" style={{ animationDelay: `${idx * 60}ms` }}>
                      <div className={`h-48 bg-gradient-to-br ${s.color} relative flex items-end p-4`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm mb-2">
                            {s.avatar}
                          </div>
                          <p className="text-white text-sm font-semibold">{s.name}</p>
                          <p className="text-white/60 text-xs">2 часа назад</p>
                        </div>
                        {!s.viewed && !s.isMyStory && (
                          <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-violet-400 rounded-full shadow-lg" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "calls" && (
              <div className="text-center animate-slide-up">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-xl neon-glow-cyan animate-float">
                  <Icon name="PhoneCall" size={40} className="text-white" />
                </div>
                <h2 className="font-golos font-bold text-2xl gradient-text mb-2">Новый звонок</h2>
                <p className="text-white/35 text-sm mb-8">Голосовые и видеозвонки в HD качестве</p>
                <div className="flex gap-3 justify-center">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-2xl text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg">
                    <Icon name="Phone" size={16} />
                    Аудиозвонок
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg">
                    <Icon name="Video" size={16} />
                    Видеозвонок
                  </button>
                </div>
              </div>
            )}

            {activeTab === "contacts" && (
              <div className="text-center animate-slide-up">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-xl neon-glow-pink animate-float">
                  <Icon name="UserPlus" size={40} className="text-white" />
                </div>
                <h2 className="font-golos font-bold text-2xl gradient-text-pink mb-2">Добавить контакт</h2>
                <p className="text-white/35 text-sm mb-8">Найдите людей по нику или номеру телефона</p>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl text-white font-semibold text-sm mx-auto hover:opacity-90 transition-opacity shadow-lg">
                  <Icon name="UserPlus" size={16} />
                  Найти контакты
                </button>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="w-full max-w-lg animate-slide-up space-y-4">
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold shadow-2xl neon-glow animate-float">
                      ЯМ
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 rounded-full text-xs text-white font-semibold whitespace-nowrap">
                      в сети
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h2 className="font-golos font-black text-3xl gradient-text">Яков Михайлов</h2>
                    <p className="text-violet-400 mt-1">@yakm · ID 827 491</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: "Контактов", value: "148" }, { label: "Группы", value: "12" }, { label: "Файлов", value: "4.2 ГБ" }].map(stat => (
                    <div key={stat.label} className="glass-strong rounded-2xl p-4 text-center">
                      <div className="font-golos font-black text-2xl gradient-text">{stat.value}</div>
                      <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-2xl p-5 space-y-4">
                  {[
                    { label: "Телефон", value: "+7 (999) 123-45-67", icon: "Phone" },
                    { label: "О себе", value: "Строю мессенджер 🚀 Люблю хорошие интерфейсы", icon: "FileText" },
                    { label: "Дата регистрации", value: "Январь 2024", icon: "Calendar" },
                  ].map(field => (
                    <div key={field.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name={field.icon} size={14} className="text-violet-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider">{field.label}</div>
                        <div className="text-sm text-white/80 mt-0.5">{field.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full h-12 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg neon-glow">
                  <Icon name="Edit3" size={16} />
                  Редактировать профиль
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="w-full max-w-lg animate-slide-up">
                {settingsSection === "notifications" && (
                  <div className="space-y-3">
                    <h2 className="font-golos font-bold text-xl gradient-text mb-6 text-center">Уведомления</h2>
                    {[
                      { label: "Пуш-уведомления", desc: "Получать уведомления на устройство", enabled: true },
                      { label: "Звук сообщений", desc: "Воспроизводить звук при получении", enabled: true },
                      { label: "Уведомления групп", desc: "Уведомлять о сообщениях в группах", enabled: false },
                      { label: "Уведомления о статусах", desc: "Истории от контактов", enabled: true },
                      { label: "Пуш при звонке", desc: "Вибрация и звук при входящем звонке", enabled: true },
                    ].map(item => (
                      <div key={item.label} className="glass rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white/90">{item.label}</div>
                          <div className="text-xs text-white/35">{item.desc}</div>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-all cursor-pointer relative ${item.enabled ? "bg-gradient-to-r from-violet-500 to-cyan-400" : "bg-white/10"}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${item.enabled ? "right-1" : "left-1"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {settingsSection === "privacy" && (
                  <div className="space-y-3">
                    <h2 className="font-golos font-bold text-xl gradient-text mb-6 text-center">Приватность и безопасность</h2>
                    {[
                      { label: "Двухфакторная аутентификация", desc: "Дополнительная защита аккаунта", icon: "ShieldCheck", on: true },
                      { label: "Статус «в сети»", desc: "Кто видит когда ты онлайн", icon: "Eye", on: true },
                      { label: "Последнее посещение", desc: "Видимость времени активности", icon: "Clock", on: false },
                      { label: "Сквозное шифрование", desc: "E2E для всех сообщений", icon: "Lock", on: true },
                      { label: "Блокировка приложения", desc: "Требовать PIN при входе", icon: "Fingerprint", on: false },
                    ].map(item => (
                      <div key={item.label} className="glass rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon name={item.icon} size={16} className="text-violet-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white/90">{item.label}</div>
                          <div className="text-xs text-white/35">{item.desc}</div>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-all cursor-pointer relative flex-shrink-0 ${item.on ? "bg-gradient-to-r from-violet-500 to-cyan-400" : "bg-white/10"}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${item.on ? "right-1" : "left-1"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {settingsSection === "storage" && (
                  <div className="space-y-4">
                    <h2 className="font-golos font-bold text-xl gradient-text mb-6 text-center">Облачное хранилище</h2>
                    <div className="glass-strong rounded-3xl p-6">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-white/60 text-sm">Использовано</span>
                        <span className="font-golos font-bold text-2xl gradient-text">4.2 ГБ</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[42%] bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-white/30">из 10 ГБ</span>
                        <span className="text-xs text-cyan-400">58% свободно</span>
                      </div>
                    </div>
                    {[
                      { label: "Фото и видео", size: "2.1 ГБ", icon: "Image", pct: 50, color: "from-violet-500 to-pink-500" },
                      { label: "Документы", size: "1.4 ГБ", icon: "FileText", pct: 33, color: "from-cyan-500 to-emerald-400" },
                      { label: "Голосовые", size: "0.7 ГБ", icon: "Mic", pct: 17, color: "from-amber-400 to-orange-500" },
                    ].map(item => (
                      <div key={item.label} className="glass rounded-2xl p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon name={item.icon} size={18} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1.5">
                            <span className="text-sm text-white/80">{item.label}</span>
                            <span className="text-sm text-white/50">{item.size}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {settingsSection === "integrations" && (
                  <div className="space-y-3">
                    <h2 className="font-golos font-bold text-xl gradient-text mb-6 text-center">Боты и интеграции</h2>
                    {[
                      { name: "Vibe Bot", desc: "Официальный бот помощник", icon: "Bot", active: true, color: "from-violet-500 to-cyan-400" },
                      { name: "Задачи", desc: "Управление задачами прямо в чате", icon: "CheckSquare", active: true, color: "from-emerald-400 to-cyan-500" },
                      { name: "Переводчик", desc: "Автоперевод сообщений", icon: "Globe", active: false, color: "from-amber-400 to-orange-500" },
                      { name: "GitHub", desc: "Уведомления о коммитах и PR", icon: "Github", active: false, color: "from-slate-400 to-slate-600" },
                    ].map(item => (
                      <div key={item.name} className="glass rounded-2xl p-4 flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon name={item.icon} size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white/90">{item.name}</div>
                          <div className="text-xs text-white/35">{item.desc}</div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${item.active ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/30"}`}>
                          {item.active ? "Активен" : "Добавить"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {(settingsSection === "appearance" || settingsSection === "devices") && (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                      <Icon name={settingsSection === "appearance" ? "Palette" : "Smartphone"} size={32} className="text-violet-400" />
                    </div>
                    <h2 className="font-golos font-bold text-xl gradient-text mb-2">
                      {settingsSection === "appearance" ? "Оформление" : "Устройства"}
                    </h2>
                    <p className="text-white/35 text-sm">Раздел в разработке</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}