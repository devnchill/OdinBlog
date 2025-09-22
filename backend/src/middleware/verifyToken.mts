import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { TUserOnReq } from "../types/express.mjs";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET || "shhhhit'sasecretyeahdon'ttellanyone",
    ) as TUserOnReq;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
}
