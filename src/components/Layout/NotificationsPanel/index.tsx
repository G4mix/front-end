"use client";

import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import styles from "./styles.module.css";
import { Notification } from "./components/Notification";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  actorProfile: {
    displayName: string;
    icon: string | null;
  };
  readAt: string | null;
  createdAt: string;
}

export const NotificationsPanel = ({
  showAll = false,
}: {
  showAll?: boolean;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const router = useRouter();

  // Mock data - substituir pela API real
  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "INVITE",
      title: "Nova solicitação de colaboração",
      message: "Lorem ipsum participate de ideia?",
      actorProfile: {
        displayName: "Lorem Ipsum",
        icon: null,
      },
      readAt: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      type: "LIKE",
      title: "Nova curtida",
      message: "Lorem ipsum curtiu sua ideia",
      actorProfile: {
        displayName: "Lorem Ipsum",
        icon: null,
      },
      readAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      type: "COMMENT",
      title: "Novo comentário",
      message: "Lorem ipsum commentou em sua ideia",
      actorProfile: {
        displayName: "Lorem Ipsum",
        icon: null,
      },
      readAt: null,
      createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  return (
    <aside className={`${styles.panel} ${showAll ? styles.showAll : ""}`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <div className={styles.bellIcon}>
            <FaBell />
          </div>
          <h2>Notificações</h2>
        </div>
        <span className={styles.badge}>
          {notifications.filter((n) => !n.readAt).length}
        </span>
      </div>

      <div className={styles.notifications}>
        {notifications.length === 0 ? (
          <div className="emptyState">
            <p>Nenhuma notificação pendente</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))
        )}
      </div>

      <div className={styles.footer}>
        {!showAll && (
          <button
            onClick={() => {
              router.push("/notifications");
            }}
            className={styles.viewAllBtn}
          >
            Exibir todas notificações
          </button>
        )}
        <button className={styles.clearAllBtn} title="Marcar todas como lidas">
          {showAll ? "Marcar todas como lidas" : "Limpar tudo"}
        </button>
      </div>
    </aside>
  );
};
