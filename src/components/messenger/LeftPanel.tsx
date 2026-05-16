import Icon from "@/components/ui/icon";
import { CONTACTS, STATUSES, CALLS, Tab } from "./messengerData";

interface LeftPanelProps {
  activeTab: Tab;
  activeChat: number | null;
  setActiveChat: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  settingsSection: string;
  setSettingsSection: (s: string) => void;
}

export default function LeftPanel({
  activeTab,
  activeChat,
  setActiveChat,
  searchQuery,
  setSearchQuery,
  settingsSection,
  setSettingsSection,
}: LeftPanelProps) {
  const filteredContacts = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
  );
}
