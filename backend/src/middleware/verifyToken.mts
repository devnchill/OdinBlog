import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { TUserOnReq } from "../types/express.mjs";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "shhhhit'sasecretyeahdon'ttellanyone",
    ) as TUserOnReq;
    req.user = decoded;
    next();
  } catch (err: unknown) {
    console.log(err);

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  }
}
