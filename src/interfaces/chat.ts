import { IPagination } from "./pagination";

export type IGetChatsReqBody = IPagination;

export interface IChatMember {
  id: string;
  displayName: string;
  icon: string | null;
}

export interface IMessage {
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export interface ILastMessage {
  senderId: string;
  content: string;
  timestamp: string;
}

export interface IChat {
  id: string;
  ownerId: string;
  collaborationRequestId?: string | null;

  title: string;
  image: string | null;
  messages?: IMessage[];
  
  createdAt: string;
}

export interface IStartChat {
  ideaId: string;
  requesterId: string;
}

export interface ISendMessage {
  chatId: string;
  content: string;
}

