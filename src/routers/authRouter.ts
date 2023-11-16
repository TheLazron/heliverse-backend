import expres, { Router } from "express";

const authRouter: Router = expres.Router();

authRouter.post("/login");
authRouter.post("/signup");

export default authRouter;
