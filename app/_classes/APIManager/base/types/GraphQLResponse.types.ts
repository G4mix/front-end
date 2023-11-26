import { PostType, UserType } from "./Models.types";

export type GenericGraphQLResponse<T> = {
  data: T;
};

export type QueryResponseTypes = {
  findAllUsers: UserType[];
  findAllPosts: PostType[];
  findUserByUsername: UserType;
  findUserByEmail: UserType;
  findUserByToken: UserType;
  findPostById: PostType;
};

export type MutationResponseTypes = {
  likePost: boolean;
  unlikePost: boolean;
  createPost: PostType;
  updatePost: PostType;
  deletePost: boolean;
  updateUser: UserType;
  deleteAccount: boolean;
};

export type GenericQueryResponse<T extends keyof QueryResponseTypes> = GenericGraphQLResponse<
  { [key in T]: QueryResponseTypes[T] & { error?: string; message?: string; } }
> ;

export type GenericMutationResponse<T extends keyof MutationResponseTypes> = GenericGraphQLResponse<
  { [key in T]: MutationResponseTypes[T] & { error?: string; message?: string; } }
>;