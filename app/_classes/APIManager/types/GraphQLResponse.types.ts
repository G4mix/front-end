import { PostType, UserType } from "./Models.types";

export type GenericGraphQLResponse<T> = {
  data: T;
};

export type QueryResponseTypes = {
  findAllUsers: Partial<UserType>[];
  findUserByUsername: Partial<UserType>;
  findUserByEmail: Partial<UserType>;
  findUserByToken: Partial<UserType>;
  createPost: Partial<PostType>;
  findAllPosts: Partial<PostType>[];
  findPostById: Partial<PostType>;
};

export type MutationResponseTypes = {
  updateUser: UserType;
  deleteAccount: boolean;
};

export type GenericQueryResponse<T extends keyof QueryResponseTypes> = GenericGraphQLResponse<
  { [key in T]: QueryResponseTypes[T] }
> & { error?: string; };

export type GenericMutationResponse<T extends keyof MutationResponseTypes> = GenericGraphQLResponse<
  { [key in T]: MutationResponseTypes[T] }
>;