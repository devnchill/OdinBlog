import { createContext } from "react";

interface IAuthContext {
  accessToken: string | null;
  role: string | null;
  saveAccessToken: (accessToken: string | null) => void;
  saveRole: (role: string | null) => void;
}
export const AuthContext = createContext<IAuthContext | undefined>(undefined);
