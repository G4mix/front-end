export type User = {
  id: number;
  username: string;
  email: string;
  icon: string;
  passwordUser: PasswordUser;
}

export type PasswordUser = {
  id: number;
  verifiedEmail: boolean;
}