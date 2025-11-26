import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { INotification, IGetNotificationsReqBody } from "@/interfaces/notification";
import { Paginated } from "@/interfaces/pagination";

const notificationUrl = `${API_URL}/notification`;

export const getNotifications = async ({
  page = 0,
  quantity = 10,
  isRead,
  type,
}: IGetNotificationsReqBody): Promise<Paginated<INotification>> => {
  const searchParams = new URLSearchParams();

  searchParams.set("page", page.toString());
  searchParams.set("quantity", quantity.toString());

  if (isRead !== undefined) searchParams.set("isRead", isRead.toString());
  if (type) searchParams.set("type", type);

  const res = await fetch(
    `${notificationUrl}?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

export const getUnreadCount = async (): Promise<{ count: number }> => {
  const res = await fetch(
    `${notificationUrl}/unread-count`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

