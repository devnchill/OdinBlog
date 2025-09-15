import express from "express";
import dotenv from "dotenv";
import signUpRouter from "./router/signUpRouter.mjs";
import loginRouter from "./router/loginRouter.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/v1/signup", signUpRouter);
app.use("/v1/login", loginRouter);

app.listen(PORT, () => {
  console.log("Server listening on PORT:", PORT);
});
