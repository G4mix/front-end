export type User = {
  id: number;
  username: string;
  email: string;
  icon: string;
  socialAccounts: SocialAccount
  passwordUser: PasswordUser
}

export type PasswordUser = {
  id: number;
  verifiedEmail: boolean;
}

export type SocialAccount = {
  id: number;
  provider: string;
  socialAccountId: string;
}