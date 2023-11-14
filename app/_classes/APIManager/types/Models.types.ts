export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  icon?: string;
  passwordUser?: PasswordUserType;
  userProfile?: UserProfileType;
};

export type PasswordUserType = {
  id?: number;
  verifiedEmail?: boolean;
  user?: UserType;
};

export type UserProfileType = {
  id?: number;
  displayName?: string;
  user?: UserType;
  posts?: PostType[];
};

export type PostType = {
  id?: number;
  author?: UserProfileType;
  title?: string;
  content?: string;
  views?: number;
  likes?: number;
  comments?: number;
  categories?: CategoryType[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoryType = {
  id?: number;
  post?: PostType;
  name: string;
};

export type CommentType = {
  id?: number;
  post?: PostType;
  author?: UserProfileType;
  replies?: CommentType[];
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  content?: string;
};