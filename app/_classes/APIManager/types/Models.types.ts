export type User = {
  id: number;
  username: string;
  email: string;
  icon: string;
  passwordUser: PasswordUser;
  userProfile: UserProfileType;
};

export type PasswordUser = {
  id: number;
  verifiedEmail: boolean;
  user?: User;
};

export type UserProfileType = {
  id: number;
  user?: User;
  posts?: PostType[];
};

export type PostType = {
  id: number;
  author: UserProfileType;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: CommentType[];
  categories: CategoryType[];
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryType = {
  id: number;
  post?: PostType;
  name: string;
};

export type CommentType = {
  id: number;
  post?: PostType;
  author?: UserProfileType;
  replies?: CommentType[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
};