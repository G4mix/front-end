export type UserType = {
  id?: number;
  username?: string;
  email?: string;
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
  icon?: string;
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

export type TagType = {
  id?: number;
  name?: string;
}

export type PostType = {
  id?: number;
  author?: UserProfileType;
  title?: string;
  images?: ImageType[];
  tags?: TagType[];
  links?: LinkType[];
  content?: string;
  isLiked?: boolean;
  viewsCount?: number;
  comments?: CommentType[];
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
  parentComment?: CommentType;
  replies?: CommentType[];
  likesCount?: number;
  createdAt?: string;
  updatedAt?: string;
  content?: string;
  isLiked?: boolean;
};