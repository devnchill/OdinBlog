import express from "express";
import dotenv from "dotenv";
import signUpRouter from "./router/signUpRouter.mjs";
import loginRouter from "./router/loginRouter.mjs";
import blogRouter from "./router/blogRouter.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/signup", signUpRouter);
app.use("/v1/login", loginRouter);
app.use("/v1/", blogRouter);

app.listen(PORT, () => {
  console.log("Server listening on PORT:", PORT);
});
