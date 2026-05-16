import Icon from "@/components/ui/icon";
import { CONTACTS, Tab } from "./messengerData";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
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
  );
}
