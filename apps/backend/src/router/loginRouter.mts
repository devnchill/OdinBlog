import { Router } from "express";
import { loginUser, loginAuthor } from "../controller/loginController.mjs";

const loginRouter = Router();

loginRouter.post("/viewer", loginUser);
loginRouter.post("/author", loginAuthor);

export default loginRouter;
