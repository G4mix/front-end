import { IPagination } from "./pagination";
import { IUserProfile } from "./user";

export interface IGetNotificationsReqBody extends IPagination {
  isRead?: boolean;
  type?: string;
}

export interface INotification {
  id: string;
  type: string;
  title: string;
  message: string;
  readAt: string | null;
  createdAt: string;
  actorProfile: IUserProfile;
  ideaTitle?: string;
  ideaId?: string;
  requesterId?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

export interface IMarkNotificationsAsRead {
  notificationIds?: string[];
}
