import { IPagination } from "./pagination";

export interface IGetProjectsReqBody extends IPagination {
  search?: string;
}

export interface IProjectOwner {
  displayName: string;
  icon: string | null;
}

export interface IProjectMember {
  autobiography: string | null;
  backgroundImage: string | null;
  displayName: string;
  followers: number;
  following: number;
  icon: string | null;
  id: string;
  links: string[];
}

export interface ITopFollower {
  name: string;
  icon: string | null;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  backgroundImage: string | null;
  chatId: string;
  owner: IProjectOwner;

  topFollowers: ITopFollower[];
  followersCount: number;
  isFollowing: boolean;
  isMember: boolean;
  isOwner: boolean;

  ideasCount: number;
  members: IProjectMember[];
}

export interface ICreateProject {
  title: string;
  description: string;
  icon?: File;
  backgroundImage?: File;
}

export interface IUpdateProject {
  title?: string;
  description?: string;
  icon?: File;
  backgroundImage?: File;
}
