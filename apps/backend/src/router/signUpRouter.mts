import { Router } from "express";
import { createUser, createAuthor } from "../controller/signUpController.mjs";

const signUpRouter = Router();

signUpRouter.post("/viewer", createUser);
signUpRouter.post("/author", createAuthor);
export default signUpRouter;
