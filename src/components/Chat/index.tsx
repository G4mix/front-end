"use client";

import { useEffect, useState } from "react";
import { ChatList } from "./components/ChatList";
import { ChatWindow } from "./components/ChatWindow";
import styles from "./styles.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { ChatPresentation } from "./components/ChatPresentation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const ChatScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const chatIdParam = searchParams.get("chatId");

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    chatIdParam
  );

  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (chatIdParam) {
      setSelectedChatId(chatIdParam);
    }
  }, [chatIdParam]);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    router.push(`/chat?chatId=${chatId}`);

    if (isMobile) {
      setIsChatOpen(true);
    }
  };

  return (
    <div className={styles.chatScreen}>
      <ChatList
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
      />

      {selectedChatId ? (
        <ChatWindow
          chatId={selectedChatId}
          isMobile={isMobile}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
        />
      ) : (
        <ChatPresentation />
      )}
    </div>
  );
};
