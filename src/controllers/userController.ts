import { Request, Response } from "express";
import User, { Domain, Gender } from "../models/users";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const getAllUsers = (req: Request, res: Response) => {
  //handling pgination
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  //handling searching and filtering
  const query: any = {};
  if (req.query.gender) {
    query.gender = req.query.gender as Gender;
  }

  if (req.query.domain) {
    query.domain = req.query.domain as Domain;
  }

  if (req.query.available) {
    query.available = req.query.available;
  }

  if (req.query.name) {
    const nameRegex = new RegExp(req.query.name as string, "i");
    query.$or = [
      { firstName: { $regex: nameRegex } },
      { lastName: { $regex: nameRegex } },
    ];
  }

  User.find(query)
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
  const { id, email, firstName, lastName, avatar, domain, gender, available } =
    createUserSchema.parse(req.body);
  User.create({
    _id: +id,
    email,
    firstName,
    lastName,
    avatar,
    domain,
    gender,
    available,
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
