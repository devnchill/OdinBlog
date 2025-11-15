import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext.mts";

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [role, setRole] = useState<string | null>(
    () => localStorage.getItem("role") || null,
  );
  const [id, setId] = useState<string | null>(
    () => localStorage.getItem("id") || null,
  );

  function saveId(id: string | null) {
    if (id) localStorage.setItem("id", id);
    else localStorage.removeItem("id");
    setId(id);
  }

  function saveRole(role: string | null) {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
    setRole(role);
  }

  return (
    <AuthContext.Provider value={{ role, saveRole, id, saveId }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
