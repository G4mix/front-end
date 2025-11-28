"use client";

import { useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import styles from "./styles.module.css";
import { Notification } from "./components/Notification";
import { useRouter } from "next/navigation";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/api/keys";
import { getNotifications, getUnreadCount } from "@/api/queries/notification";
import { markNotificationsAsRead } from "@/api/mutations/notification";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { toast } from "@/utils/toast";

export const Notifications = ({ showAll = false }: { showAll?: boolean }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const quantity = showAll ? 10 : 3;
  const isReadFilter = showAll ? undefined : false;

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_NOTIFICATIONS, showAll],
      queryFn: ({ pageParam = 0 }) =>
        getNotifications({
          page: pageParam as number,
          quantity,
          isRead: isReadFilter,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      refetchInterval: 30000, // Poll every 30 seconds
    });

  const { data: unreadCountData } = useQuery({
    queryKey: [QUERY_KEYS.GET_UNREAD_COUNT],
    queryFn: getUnreadCount,
    refetchInterval: 30000, // Poll every 30 seconds
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allNotifications = data?.pages.flatMap((page) => page.data) ?? [];

  const unreadCount = unreadCountData?.count ?? 0;

  const markAllAsReadMutation = useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UNREAD_COUNT],
      });
      toast.success("Notificações marcadas como lidas");
    },
    onError: () => {
      toast.error("Erro ao marcar notificações como lidas");
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationsAsRead({ notificationIds: [notificationId] }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UNREAD_COUNT],
      });
    },
    onError: () => {
      toast.error("Erro ao marcar notificação como lida");
    },
  });

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate({});
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  };

  return (
    <aside className={`${styles.panel} ${showAll ? styles.showAll : ""}`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <div className={styles.bellIcon}>
            <FaBell />
          </div>
          <h2>Notificações</h2>
        </div>
        <span className={styles.badge}>{unreadCount}</span>
      </div>

      <div className={styles.notifications}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <SpinnerLoading isPrimary />
          </div>
        ) : allNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhuma notificação pendente</p>
          </div>
        ) : (
          <>
            {allNotifications.map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
            {hasNextPage && (
              <div ref={loadMoreRef} className={styles.loadMoreTrigger}>
                {isFetchingNextPage && <SpinnerLoading isPrimary />}
              </div>
            )}
          </>
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
        <button
          className={styles.clearAllBtn}
          onClick={handleMarkAllAsRead}
          disabled={markAllAsReadMutation.isPending || unreadCount === 0}
          title="Marcar todas como lidas"
        >
          {showAll ? "Marcar todas como lidas" : "Limpar tudo"}
        </button>
      </div>
    </aside>
  );
};
