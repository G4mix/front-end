"use client";

import { BiMessage } from "react-icons/bi";
import styles from "./styles.module.css";
import { FaAngleUp, FaArrowRight } from "react-icons/fa6";
import { Message } from "./components/Message";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/api/queries/chat";
import { QUERY_KEYS } from "@/api/keys";
import { SpinnerLoading } from "@/components/SpinnerLoading";

export const Messages = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHATS],
    queryFn: () => getChats({ page: 0, quantity: 3 }),
    enabled: isOpen,
  });

  const chats = data?.data ?? [];

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
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <SpinnerLoading isPrimary />
            </div>
          ) : chats.length === 0 ? (
            <div className={styles.emptyState}>
              <BiMessage className={styles.emptyIcon} />
              <p>Nenhuma conversa ainda</p>
              <span>Suas mensagens aparecerão aqui</span>
            </div>
          ) : (
            <>
              <div className={styles.messagesList}>
                {chats.map((chat) => (
                  <Message key={chat.id} chat={chat} />
                ))}
              </div>

              <Link href="/chat" className={styles.viewAllBtn}>
                Abrir todas as mensagens
                <FaArrowRight />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
