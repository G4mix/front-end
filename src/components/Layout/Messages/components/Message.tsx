"use client";

import styles from "../styles.module.css";
import { IChat } from "@/interfaces";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { UserIcon } from "@/components/Users";
import { useRouter } from "next/navigation";

export const Message = ({ chat }: { chat: IChat }) => {
  const router = useRouter();
  
  const lastMessage = chat.messages?.[0];
  
  const handleClick = () => {
    router.push(`/chat?chatId=${chat.id}`);
  };

  return (
    <div className={styles.messagesListItem} onClick={handleClick}>
      <UserIcon
        displayName={chat.title}
        icon={chat.image}
        size={48}
        fontSize="1.25rem"
      />

      <div className={styles.messagesListItemContent}>
        <div className={styles.header}>
          <strong>{chat.title}</strong>
          {lastMessage && <span>{formatRelativeTime(lastMessage.timestamp)}</span>}
        </div>
        {lastMessage && <p className={styles.content}>{lastMessage.content}</p>}
      </div>
    </div>
  );
};
