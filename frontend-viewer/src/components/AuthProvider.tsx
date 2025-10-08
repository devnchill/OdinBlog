import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext.mts";

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );
  const [role, setRole] = useState<string | null>(() =>
    localStorage.getItem("role"),
  );
  function saveAccessToken(accessToken: string | null) {
    localStorage.setItem("accessToken", accessToken ?? "");
    setAccessToken(accessToken);
  }
  function saveRole(role: string | null) {
    localStorage.setItem("role", role ?? "");
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
