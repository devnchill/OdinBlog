import type { ZodSafeParseResult } from "zod";
import { User } from "../generated/prisma/client.js";

export type TUserOnReq = Pick<User, "id" | "userName">;

declare global {
  namespace Express {
    interface Request {
      user?: TUserOnReq;
      validationData?: Request<string, unknown>;
    }
  }
}
