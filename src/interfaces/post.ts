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

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
}