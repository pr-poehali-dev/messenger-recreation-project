import Icon from "@/components/ui/icon";
import { CONTACTS, MESSAGES, STATUSES, Tab } from "./messengerData";

interface MainContentProps {
  activeTab: Tab;
  activeChat: number | null;
  message: string;
  setMessage: (m: string) => void;
  settingsSection: string;
}

export default function MainContent({
  activeTab,
  activeChat,
  message,
  setMessage,
  settingsSection,
}: MainContentProps) {
  const activeChatData = CONTACTS.find(c => c.id === activeChat);

  return (
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
  );
}
