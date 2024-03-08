import { CommentType, PostType, UserType } from "./Models.types";

export type HandleResponse<T extends keyof ResponseTypes> = GraphQLResponse<T>["data"][T] | { error?: string; message?: string; } | undefined;

export type GraphQLResponse<T extends keyof ResponseTypes> = {
  data: { [key in T]: ResponseTypes[T] };
};

export type ResponseTypes = {
  // Queries
  findAllCommentsOfAPost: CommentType[];
  findAllUsers: UserType[];
  findAllPosts: PostType[];
  findUserByUsername: UserType;
  findUserByEmail: UserType;
  findUserByToken: UserType;
  findPostById: PostType;

  // Mutations
  commentPost: CommentType;
  replyComment: CommentType;
  likeComment: null;
  likePost: null;
  unlikePost: boolean;
  createPost: PostType;
  updatePost: PostType;
  deletePost: boolean;
  updateUser: UserType;
  deleteAccount: boolean;
};