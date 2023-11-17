import { Request, Response } from "express";
import User from "../models/users";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const getAllUsers = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  User.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.error("Error retrieving users:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  const user = User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const createUser = (req: Request, res: Response) => {
  const { email, firstName, lastName, avatar, domain, gender, available } =
    createUserSchema.parse(req.body);
  User.create({
    email,
    firstName,
    lastName,
    avatar,
    domain,
    gender,
    available: available as boolean,
  })
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const updateUser = (req: Request, res: Response) => {
  const { firstName, lastName, avatar, domain, gender, available } =
    updateUserSchema.parse(req.body);
  const id = req.params.id;
  User.findByIdAndUpdate(
    id,
    { firstName, lastName, avatar, domain, gender, available },
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
