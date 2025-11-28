"use client";

import { BsFillChatDotsFill } from "react-icons/bs";
import styles from "./styles.module.css";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/api/queries/chat";
import { QUERY_KEYS } from "@/api/keys";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { UserIcon } from "@/components/Users";
import { formatRelativeTime } from "@/utils/dateFormatter";

interface ChatListProps {
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export const ChatList = ({ selectedChatId, onSelectChat }: ChatListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHATS],
    queryFn: () => getChats({ page: 0, quantity: 50 }),
  });

  const chats = data?.data ?? [];

  return (
    <aside className={styles.chatList}>
      <div className={styles.header}>
        <BsFillChatDotsFill className={styles.headerIcon} />
        <h2>Chat</h2>
      </div>

      <div className={styles.chats}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <SpinnerLoading isPrimary />
          </div>
        ) : chats.length === 0 ? (
          <div className={styles.emptyList}>
            <p>Nenhuma conversa ainda</p>
          </div>
        ) : (
          chats.map((chat) => {
            const isSelected = chat.id === selectedChatId;

            return (
              <button
                key={chat.id}
                className={`${styles.chatItem} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <UserIcon
                  displayName={chat.title}
                  icon={chat.image}
                  size={48}
                  fontSize="1.25rem"
                />

                <div className={styles.chatInfo}>
                  <div className={styles.chatHeader}>
                    <span className={styles.name}>
                      {chat.title}
                    </span>
                    {chat.messages?.[0] && (
                      <span className={styles.time}>
                        {formatRelativeTime(chat.messages[0].timestamp)}
                      </span>
                    )}
                  </div>
                  {chat.messages?.[0] && (
                    <p className={styles.lastMessage}>
                      {chat.messages[0].content}
                    </p>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
