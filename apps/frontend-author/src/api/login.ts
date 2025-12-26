import type { TSendloginRequest } from "../types/login.types.ts";

export const sendLoginRequest = async ({
  userName,
  password,
}: TSendloginRequest) => {
  const resLog = await fetch("/api/login/author", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  });

  const res = await resLog.json();

  return res;
};
