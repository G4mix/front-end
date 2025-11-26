import { INotification } from "@/interfaces";
import styles from "../styles.module.css";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { UserIcon } from "@/components/Users";

export const Notification = ({
  notification,
}: {
  notification: INotification;
}) => {
  return (
    <div
      key={notification.id}
      className={`${styles.notification} ${
        !notification.readAt ? styles.unread : ""
      }`}
    >
      <UserIcon
        displayName={notification.actorProfile.displayName}
        icon={notification.actorProfile.icon}
        size={32}
        rounded={false}
      />

      <div className={styles.notificationContent}>
        <p className={styles.notificationMessage}>
          <strong>{notification.actorProfile.displayName}</strong>{" "}
          {notification.message}
        </p>

        <span className={styles.notificationTimestamp}>
          {formatRelativeTime(notification.createdAt)}
        </span>
      </div>
    </div>
  );
};
