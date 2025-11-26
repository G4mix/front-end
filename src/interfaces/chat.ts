import { IPagination } from "./pagination";

export interface IGetChatsReqBody extends IPagination {}

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

export interface IChat {
  id: string;
  ownerId: string;
  ideaId: string | null;
  projectId: string | null;
  members: IChatMember[];
  messages?: IMessage[];
}

export interface IStartChat {
  ideaId: string;
  requesterId: string;
}

export interface ISendMessage {
  chatId: string;
  content: string;
}

