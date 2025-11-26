import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IMarkNotificationsAsRead } from "@/interfaces/notification";

const notificationUrl = `${API_URL}/notification`;

export const markNotificationsAsRead = async (
  body: IMarkNotificationsAsRead = {}
): Promise<void> => {
  const res = await fetch(`${notificationUrl}/read`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...getHeaderOptions(),
  });

  await handleError(res);
};

export const deleteAllNotifications = async (): Promise<void> => {
  const res = await fetch(notificationUrl, {
    method: "DELETE",
    ...getHeaderOptions(),
  });

  await handleError(res);
};

