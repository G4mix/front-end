import { createContext } from "react";

import { IUser } from "@/interfaces/user";
import { ILogin, IRegister } from "@/interfaces/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  signin: (body: ILogin) => Promise<void>;
  signup: (body: IRegister) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signin: async (_body: ILogin) => {
    throw new Error("useAuth: signin chamado fora do AuthProvider");
  },
  signup: async (_body: IRegister) => {
    throw new Error("useAuth: signup chamado fora do AuthProvider");
  },
  logout: () => {
    throw new Error("useAuth: logout chamado fora do AuthProvider");
  },
});
