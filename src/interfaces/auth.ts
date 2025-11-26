import { IUserProfile } from "./user";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse extends Response{
  accessToken: string;
  refreshToken: string;
  userProfile: IUserProfile;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
}

export interface IRegisterResponse extends ILoginResponse {}

export interface IRefreshTokenRequestResponse {
  accessToken: string;
  refreshToken: string;
}
