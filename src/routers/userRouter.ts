import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users", createUser);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);
export default userRouter;
