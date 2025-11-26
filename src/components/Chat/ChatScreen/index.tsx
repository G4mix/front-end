"use client";

import { useState } from "react";
import { ChatList } from "../ChatList";
import { ChatWindow } from "../ChatWindow";
import { EmptyChatState } from "../EmptyChatState";
import styles from "./styles.module.css";

export const ChatScreen = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  return (
    <div className={styles.chatScreen}>
      <ChatList
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />

      {selectedChatId ? (
        <ChatWindow chatId={selectedChatId} />
      ) : (
        <EmptyChatState />
      )}
    </div>
  );
};

