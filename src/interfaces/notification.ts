import { IPagination } from "./pagination";

export interface IGetNotificationsReqBody extends IPagination {
  isRead?: boolean;
  type?: string;
}

export interface IActorProfile {
  displayName: string;
  icon: string | null;
}

export interface INotification {
  id: string;
  type: string;
  title: string;
  message: string;
  readAt: string | null;
  createdAt: string;
  actorProfile: IActorProfile;
  ideaTitle?: string;
  ideaId?: string;
  requesterId?: string;
}

export interface IMarkNotificationsAsRead {
  notificationIds?: string[];
}

