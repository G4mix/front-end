import { IPagination } from "./pagination";
import { IAuthor } from "./user";

export interface IGetCommentsReqBody extends IPagination {
  ideaId: string;
  parentCommentId?: string;
}

export interface IComment {
  id: string;
  ideaId: string;
  content: string;
  parentCommentId: string | null;
  author: IAuthor;
  replies: number;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

export interface ICreateComment {
  ideaId: string;
  content: string;
  parentCommentId?: string;
}

