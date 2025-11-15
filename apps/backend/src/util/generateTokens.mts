import jwt from "jsonwebtoken";
import type { TUserOnReq } from "../types/express.mjs";

export function generateTokens(user: TUserOnReq) {
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets not defined in environment variables");
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      userName: user.userName,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" },
  );
  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
}
