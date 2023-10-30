import { User } from "./Models.types";

export type GenericGraphQLResponse<T> = {
  data: T;
};

export type QueryResponseTypes = {
  findAllUsers: Partial<User>[];
  findUserByUsername: Partial<User>;
  findUserByEmail: Partial<User>;
  findUserByToken: Partial<User>;
};

export type MutationResponseTypes = {
  updateUser: User;
  deleteAccount: boolean;
};

export type GenericQueryResponse<T extends keyof QueryResponseTypes> = GenericGraphQLResponse<
  { [key in T]: QueryResponseTypes[T] }
> & { error?: string; };

export type GenericMutationResponse<T extends keyof MutationResponseTypes> = GenericGraphQLResponse<
  { [key in T]: MutationResponseTypes[T] }
>;