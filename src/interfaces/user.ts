export interface IUser {
  id: string;
  username: string;
  email: string;
  verified?: boolean;
}

export interface IUserProfile {
  id: string;
  displayName: string;
  icon: string | null;
  backgroundImage: string | null;
  autobiography: string | null;
  links: string[];
  followers: number;
  following: number;
  isFollowing: boolean;
  user?: IUser;
}

export interface IAuthor {
  displayName: string;
  icon: string | null;
  id: string;
  followers: number;
  following: number;
}
