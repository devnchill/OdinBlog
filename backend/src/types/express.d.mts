import { User } from "../generated/prisma/client.js";

export type TUserOnReq = pick<User, "id" | "userName" | "role">;

declare global {
  namespace Express {
    interface Request {
      user?: TUserOnReq;
    }
  }
}
