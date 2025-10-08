import { createContext } from "react";

interface IAuthContext {
  role: string | null;
  saveRole: (role: string | null) => void;
}
export const AuthContext = createContext<IAuthContext | undefined>(undefined);
