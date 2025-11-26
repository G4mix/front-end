"use client";

import { FaUserCircle } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import Image from "next/image";
import styles from "./styles.module.css";

interface ChatListProps {
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

// Mock data
const mockChats = [
  {
    id: "1",
    members: [{ displayName: "Lorem Ipsum", icon: null }],
    lastMessage: {
      content: "Lorem ipsum fdas mensagem sempre...",
      timestamp: "12:01",
    },
  },
  {
    id: "2",
    members: [{ displayName: "Lorem", icon: null }],
    lastMessage: {
      content: "Lorem Enfreur est tem lorem da...",
      timestamp: "12:01",
    },
  },
  {
    id: "3",
    members: [{ displayName: "Andre", icon: null }],
    lastMessage: {
      content: "André: O homeal blanguarda eving",
      timestamp: "12:01",
    },
  },
  {
    id: "4",
    members: [{ displayName: "Gabriel", icon: null }],
    lastMessage: {
      content: "Gabriel: Otein mensagem probare...",
      timestamp: "12:01",
    },
  },
  {
    id: "5",
    members: [{ displayName: "Vinicius Morais", icon: null }],
    lastMessage: {
      content: "Vinicius Morais: teju lorem da ge...",
      timestamp: "12:01",
    },
  },
];

export const ChatList = ({ selectedChatId, onSelectChat }: ChatListProps) => {
  return (
    <aside className={styles.chatList}>
      <div className={styles.header}>
        <BsFillChatDotsFill className={styles.headerIcon} />
        <h2>Chat</h2>
      </div>

      <div className={styles.chats}>
        {mockChats.map((chat) => {
          const member = chat.members[0];
          const isSelected = chat.id === selectedChatId;

          return (
            <button
              key={chat.id}
              className={`${styles.chatItem} ${isSelected ? styles.selected : ""}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className={styles.avatar}>
                {member.icon ? (
                  <Image src={member.icon} alt="" width={48} height={48} />
                ) : (
                  <FaUserCircle className={styles.avatarIcon} />
                )}
              </div>

              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <span className={styles.name}>{member.displayName}</span>
                  <span className={styles.time}>{chat.lastMessage.timestamp}</span>
                </div>
                <p className={styles.lastMessage}>{chat.lastMessage.content}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

