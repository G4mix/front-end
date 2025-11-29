"use client";

import { INotification } from "@/interfaces";
import styles from "../styles.module.css";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { UserIcon } from "@/components/Users";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { startChat } from "@/api/mutations/chat";
import { toast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { BsChatDotsFill } from "react-icons/bs";

export const Notification = ({
  notification,
  onMarkAsRead,
}: {
  notification: INotification;
  onMarkAsRead?: (notificationId: string) => void;
}) => {
  const router = useRouter();

  const isCollaborationInvite =
    notification.type === "Invite" &&
    notification.relatedEntityType === "COLLABORATION_REQUEST";

  const startChatMutation = useMutation({
    mutationFn: startChat,
    onSuccess: (data) => {
      onMarkAsRead?.(notification.id);
      router.push(`/chat?chatId=${data.id}`);
    },
    onError: () => {
      toast.error("Erro ao iniciar conversa");
    },
  });

  const handleStartChat = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!notification.requesterId || !notification.ideaId) {
      toast.error("Dados da notificação incompletos");
      return;
    }

    startChatMutation.mutate({
      requesterId: notification.requesterId,
      ideaId: notification.ideaId,
    });
  };

  const handleClick = () => {
    if (!notification.readAt && onMarkAsRead && !isCollaborationInvite) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      key={notification.id}
      className={`${styles.notification} ${
        !notification.readAt ? styles.unread : ""
      }`}
      onClick={handleClick}
    >
      <UserIcon
        displayName={notification.actorProfile.displayName}
        icon={notification.actorProfile.icon}
        size={32}
        rounded={false}
      />

      <div className={styles.notificationContent}>
        <p className={styles.notificationMessage}>
          <Link href={`/profile/${notification.actorProfile.id}`}>
            <strong>@{notification.actorProfile.displayName}</strong>{" "}
          </Link>
          {isCollaborationInvite ? (
            <>
              deseja participar da ideia{" "}
              <Link href={`/idea/${notification.ideaId}`}>
                {notification.ideaTitle}
              </Link>
            </>
          ) : (
            notification.message
          )}
        </p>

        <span className={styles.notificationTimestamp}>
          {formatRelativeTime(notification.createdAt)}
        </span>
      </div>

      {isCollaborationInvite &&
        notification.requesterId &&
        notification.ideaId && (
          <button
            className={styles.responseButton}
            onClick={handleStartChat}
            disabled={startChatMutation.isPending}
            title="Iniciar conversa"
          >
            <BsChatDotsFill size={16} />
          </button>
        )}
    </div>
  );
};
