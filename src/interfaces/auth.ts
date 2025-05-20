import { IUser } from "./user";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
}

export interface IRegisterResponse extends ILoginResponse {}

export interface IRefreshTokenRequestResponse
  extends Omit<ILoginResponse, "user"> {}
