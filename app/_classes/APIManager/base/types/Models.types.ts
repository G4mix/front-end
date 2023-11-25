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

export type ImageType = {
  width?: number;
  height?: number;
  src?: string;
  name?: string;
}

export type LinkType = {
  id?: number;
  link?: string;
}

export type PostType = {
  id?: number;
  author?: UserProfileType;
  title?: string;
  images?: ImageType[];
  links?: LinkType[];
  content?: string;
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
  categories?: CategoryType[];
  createdAt?: string;
  updatedAt?: string;
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
  likesCount?: number;
  createdAt?: string;
  updatedAt?: string;
  content?: string;
};