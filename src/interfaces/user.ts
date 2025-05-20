export interface IUser {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  created_at: string;
  userProfile: IUserProfile;
}

export interface IUserProfile {
  id: string;
  icon: string | null;
  displayName: string | null;
}
