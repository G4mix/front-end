import { createContext } from "react";

import { IUserProfile } from "@/interfaces/user";
import { ILogin, IRegister } from "@/interfaces/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: IUserProfile | null;
  signin: (body: ILogin) => Promise<void>;
  signup: (body: IRegister) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  signin: async () => {
    throw new Error("useAuth: signin chamado fora do AuthProvider");
  },
  signup: async () => {
    throw new Error("useAuth: signup chamado fora do AuthProvider");
  },
  logout: () => {
    throw new Error("useAuth: logout chamado fora do AuthProvider");
  },
});
