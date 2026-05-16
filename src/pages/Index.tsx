import { useState } from "react";
import Sidebar from "@/components/messenger/Sidebar";
import LeftPanel from "@/components/messenger/LeftPanel";
import MainContent from "@/components/messenger/MainContent";
import { Tab } from "@/components/messenger/messengerData";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsSection, setSettingsSection] = useState("notifications");

  return (
    <div className="flex h-screen w-screen bg-mesh overflow-hidden font-rubik">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <LeftPanel
        activeTab={activeTab}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        settingsSection={settingsSection}
        setSettingsSection={setSettingsSection}
      />
      <MainContent
        activeTab={activeTab}
        activeChat={activeChat}
        message={message}
        setMessage={setMessage}
        settingsSection={settingsSection}
      />
    </div>
  );
}
