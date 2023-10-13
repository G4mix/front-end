export type QueryType = "findAllUsers" | "findUserByUsername" | "findUserByEmail" | "findUserByToken";
export type MutationType = "updateUser" | "deleteAccount";

export type GenericQueryRequest<Query extends QueryType, Variables = {}> = 
  { query: `query { ${Query} { ${string} } }`, variables?: Variables };
export type GenericMutationRequest<Mutation extends MutationType, Variables = {}> = 
  { query: `query { ${Mutation} { ${string} } }`, variables?: Variables };