import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext.mts";

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  function saveId(id: string | null) {
    setId(id);
  }

  function saveRole(role: string | null) {
    setRole(role);
  }

  return (
    <AuthContext.Provider value={{ role, saveRole, id, saveId }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
