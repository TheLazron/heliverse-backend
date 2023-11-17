import expres, { Router } from "express";
import { logUserIn, signUserUp } from "../controllers/authController";

const authRouter: Router = expres.Router();

authRouter.post("/login", logUserIn);
authRouter.post("/signup", signUserUp);

export default authRouter;
