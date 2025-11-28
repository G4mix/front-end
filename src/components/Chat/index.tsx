"use client";

import { useEffect, useState } from "react";
import { ChatList } from "./components/ChatList";
import { ChatWindow } from "./components/ChatWindow";
import { EmptyChatState } from "./components/EmptyChatState";
import styles from "./styles.module.css";
import { useSearchParams, useRouter } from "next/navigation";

export const ChatScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatIdParam = searchParams.get("chatId");
  
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chatIdParam);

  // Sync selectedChatId with URL params
  useEffect(() => {
    if (chatIdParam) {
      setSelectedChatId(chatIdParam);
    }
  }, [chatIdParam]);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    router.push(`/chat?chatId=${chatId}`);
  };

  return (
    <div className={styles.chatScreen}>
      <ChatList
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
      />

      {selectedChatId ? (
        <ChatWindow chatId={selectedChatId} />
      ) : (
        <EmptyChatState />
      )}
    </div>
  );
};

