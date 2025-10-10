import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext.mts";

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [role, setRole] = useState<string | null>(() =>
    localStorage.getItem("role"),
  );

  function saveRole(role: string | null) {
    localStorage.setItem("role", role ?? "");
    setRole(role);
  }
  return (
    <AuthContext.Provider value={{ role, saveRole }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
