import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext.mts";

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [role, setRole] = useState<string | null>(() =>
    localStorage.getItem("role"),
  );
  const [id, setId] = useState<string | null>(() => localStorage.getItem("id"));

  function saveId(id: string | null) {
    localStorage.setItem("id", id ?? "");
    setId(id);
  }

  function saveRole(role: string | null) {
    localStorage.setItem("role", role ?? "");
    setRole(role);
  }

  return (
    <AuthContext.Provider value={{ role, saveRole, id, saveId }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
