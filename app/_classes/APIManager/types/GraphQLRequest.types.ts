export type QueryType = "findAllUsers" | "findUserByUsername" | "findUserByEmail" | "findUserByToken";
export type MutationType = "updateUser" | "deleteAccount" | "createPost" | "findAllPosts";

type UserFields = 
  "id"
  | "username"
  | "email"
  | "icon"
  | "id username"
  | "id email"
  | "id icon"
  | "username email"
  | "username icon"
  | "email icon"
  | "id username email"
  | "id username icon"
  | "id email icon"
  | "username email icon"
  | "id username email icon";

type PasswordFields =
  "id" 
  | "verifiedEmail"
  | "id verifiedEmail";

type Fields = UserFields | `${UserFields} passwordUser { ${PasswordFields} }`;

export type GenericQueryRequest<Query extends QueryType> = 
  { query: `query { ${Query} { ${Fields} } }` };

export type GenericMutationRequest<Mutation extends MutationType, Variables = {}> = 
  { query: `${"mutation" | "query"} ${Mutation}${string | undefined} { ${Mutation}${string | undefined} { ${string} }}`, variables?: Variables };