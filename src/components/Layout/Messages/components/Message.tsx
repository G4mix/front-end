import Image from "next/image";
import styles from "../styles.module.css";
import { IChat } from "@/interfaces";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { UserIcon } from "@/components/Users";

export const Message = ({ message }: { message: IChat }) => {
  const lastMessage = message.messages?.[0];

  return (
    <div className={styles.messagesListItem}>
      <UserIcon displayName={lastMessage?.senderName ?? ""} size={48} fontSize="1.25rem" />

      <div className={styles.messagesListItemContent}>
        <div className={styles.h2eader}>
          <strong>{lastMessage?.senderName}</strong>
          <span>{formatRelativeTime(lastMessage?.timestamp ?? "")}</span>
        </div>
        <p className={styles.content}>
          {lastMessage?.content}
        </p>
      </div>
    </div>
  );
};
