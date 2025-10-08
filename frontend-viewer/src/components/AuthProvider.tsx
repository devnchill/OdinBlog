import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext.mts";

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  function saveAccessToken(accessToken: string | null) {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  }
  function saveRole(role: string | null) {
    if (role) localStorage.setItem("role", role);
    setAccessToken(role);
    setRole(role);
  }
  return (
    <AuthContext.Provider
      value={{ accessToken, saveAccessToken, role, saveRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
