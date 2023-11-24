export type RequestBody<U> = 
  U extends "/auth/signup" ? SignUpBody
  : U extends "/auth/signin" ? SignInBody
  : U extends "/auth/signout" ? undefined 
  : U extends "/auth/refreshtoken" ? { refreshToken?: string; }
  : U extends "/graphql" ? { query: string } 
  : undefined;

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
};

export type SignInBody = {
  username?: string, email?: string, password: string, rememberMe: boolean
};