import { Router } from "express";
import { createUser } from "../controller/signUpController.mjs";

const signUpRouter = Router();

signUpRouter.post("/", createUser);
export default signUpRouter;
