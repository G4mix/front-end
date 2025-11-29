import { IPagination } from "./pagination";
import { IAuthor } from "./user";

export interface IGetIdeasReqBody extends IPagination {
  authorId?: string;
  projectId?: string;
}

export interface IIdea {
  id: string;
  title: string;
  content: string;
  images: string[];
  links: string[];
  projectId: string | null;
  author: IAuthor;
  tags: string[];
  comments: number;
  likes: number;
  views: number;
  isLiked: boolean;
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
  hasPendingCollaborationRequest?: boolean;
}

export interface ICreateIdea {
  title: string;
  content: string;
  links?: string[];
  images: FileList;
  tags?: string[];
  projectId?: string;
}

export interface IUpdateIdea {
  title?: string;
  content?: string;
  links?: string[];
  images?: FileList;
  tags?: string[];
}

