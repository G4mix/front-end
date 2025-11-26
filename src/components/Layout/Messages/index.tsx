"use client";

import { BiMessage } from "react-icons/bi";
import styles from "./styles.module.css";
import { FaAngleUp, FaArrowRight } from "react-icons/fa6";
import { IChat } from "@/interfaces";
import { Message } from "./components/Message";
import Link from "next/link";
import { useState } from "react";

// Mock de chats
const mockChats: IChat[] = [
  {
    id: "1",
    ownerId: "user1",
    ideaId: "idea1",
    projectId: null,
    members: [
      {
        id: "user2",
        displayName: "Maria Silva",
        icon: "/images/avatar.png",
      },
      {
        id: "user1",
        displayName: "Você",
        icon: null,
      },
    ],
    messages: [
      {
        senderId: "user1",
        senderName: "user1",
        content: "Olá! Vi sua proposta de parceria.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        senderId: "user2",
        senderName: "user2",
        content: "Adorei sua ideia de app! Podemos conversar mais sobre isso?",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutos atrás
      },
    ],
  },
  {
    id: "2",
    ownerId: "user1",
    ideaId: null,
    projectId: "proj1",
    members: [
      {
        id: "user3",
        displayName: "João Pereira",
        icon: null,
      },
      {
        id: "user1",
        displayName: "Você",
        icon: null,
      },
    ],
    messages: [
      {
        senderId: "user1",
        senderName: "user1",
        content: "Vamos discutir o cronograma?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
      {
        senderId: "user3",
        senderName: "user3",
        content: "Quando podemos marcar a próxima reunião do projeto?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
      },
    ],
  },
  {
    id: "3",
    ownerId: "user4",
    ideaId: "idea2",
    projectId: null,
    members: [
      {
        id: "user4",
        displayName: "Ana Costa",
        icon: "/images/avatar.png",
      },
      {
        id: "user1",
        displayName: "Você",
        icon: null,
      },
    ],
    messages: [
      {
        senderId: "user4",
        senderName: "user4",
        content:
          "Preciso da documentação para continuar lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
      },
      {
        senderId: "user1",
        senderName: "user1",
        content: "Vou enviar a documentação ainda hoje!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 dia atrás
      },
    ],
  },
];

export const Messages = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.messages}>
      <div className={`${styles.messagesHeader} ${isOpen ? styles.open : ""}`}>
        <div className={styles.messagesHeaderTitle}>
          <div className={styles.messagesHeaderIcon}>
            <BiMessage />
          </div>
          <h2>Mensagens</h2>
        </div>

        <button
          className={`${styles.dropdownButton} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaAngleUp />
        </button>
      </div>

      <div className={`${styles.dropdownContent} ${isOpen ? styles.open : ""}`}>
        <div className={styles.dropdownContentInner}>
          <div className={styles.messagesList}>
            {mockChats.map((chat) => (
              <Message key={chat.id} message={chat} />
            ))}
          </div>

          <Link href="/chat" className={styles.viewAllBtn}>
            Abrir todas as mensagens
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
