import { createContext } from "react";

interface IAuthContext {
  role: string | null;
  id: string | null;
  saveRole: (role: string | null) => void;
  saveId: (id: string | null) => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
