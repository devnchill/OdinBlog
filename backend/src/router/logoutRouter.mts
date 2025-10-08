import { Router } from "express";

const logoutRouter = Router();

logoutRouter.post("/", (_req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    path: "/",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    path: "/",
  });
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
export default logoutRouter;
