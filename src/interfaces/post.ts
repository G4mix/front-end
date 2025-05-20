import { IPagination } from "./pagination";
import { IAuthor } from "./user";

export interface IGetPostsReqBody extends IPagination {
  tab: "following" | "recommendations" | "highlights";
  since: string;
  userProfileId?: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string | null;
  authorId: string;
  eventId: string | null;
  created_at: string;
  updated_at: string;
  author: IAuthor;
  images: Image[];
  links: string[];
  tags: string[];
  event: any;
  isLiked: boolean;
  isViewed: boolean;
  likesCount: number;
  viewsCount: number;
  commentsCount: number;
}

export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ICreatePost {
  userProfileId: string;
  title: string;
  content: string;
  links?: string[];
  images?: FileList;
  tags?: string[];
  event?: EventInput;
}

export interface EventInput {
  subject: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  frequency?: EventFrequency;
}

export enum EventFrequency {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  YEARLY = "YEARLY",
}
