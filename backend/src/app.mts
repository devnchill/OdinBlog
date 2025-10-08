import express from "express";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import signUpRouter from "./router/signUpRouter.mjs";
import loginRouter from "./router/loginRouter.mjs";
import blogRouter from "./router/blogRouter.mjs";
import authRouter from "./router/authRouter.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import logoutRouter from "./router/logoutRouter.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/v1/auth", authRouter);
app.use("/v1/signup", signUpRouter);
app.use("/v1/login", loginRouter);
app.use("/v1/logout", logoutRouter);
app.use("/v1/blog", blogRouter);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);

  return res.status(500).json({
    success: false,
    message: "internal server error",
  });
});

app.listen(PORT, () => {
  console.log("Server listening on PORT:", PORT);
});
