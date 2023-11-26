export type QueryType = "findAllUsers" | "findUserByUsername" | "findUserByEmail" | "findUserByToken"  | "findAllPosts" | "findPostById";
export type MutationType = "updateUser" | "deleteAccount" | "createPost" | "updatePost" | "deletePost";

export type GenericQueryRequest<Query extends QueryType> = 
  { query: `query { ${Query} { ${string} } }` } 
  |
  { 
    query: `query ${Query}${string | undefined} { ${Query}${string | undefined} { ${string} }}`, 
    variables?: {[key: string]: unknown} 
  };

export type GenericMutationRequest<Mutation extends MutationType> = 
  { 
    query: `mutation ${Mutation}${string | undefined} { ${Mutation}${string | undefined} { ${string} }}`, 
    variables?: {[key: string]: unknown} 
  };