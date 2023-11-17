import { Request, Response } from "express";
import { loginSchema, signUpSchema } from "../schemas/authSchema";
import { comparePasswords, encryptPassowrd } from "../utils/bcrypt";
import AuthUser from "../models/authenticatedUser";
import errorResponseHandler from "../utils/errorHandler";
import { generateAccessToken } from "../utils/jwtUtils";

const signUserUp = (req: Request, res: Response) => {
  const { email, password, username } = signUpSchema.parse(req.body);
  encryptPassowrd(password)
    .then((encryptedPassword) => {
      AuthUser.create({ email, passwordHash: encryptedPassword, username })
        .then((user) => {
          res.json({ data: user });
        })
        .catch((err) => {
          errorResponseHandler(res, err, "Error signing up user");
        });
    })
    .catch((err) => {
      errorResponseHandler(res, err, "Error signing up user");
    });
};

const logUserIn = (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  AuthUser.findOne({ email })
    .then((user) => {
      console.log("found user", user);
      if (user) {
        comparePasswords(password, user.passwordHash)
          .then((passwordMatch) => {
            if (passwordMatch) {
              const token = generateAccessToken(user.email, user.id);
              res.json({
                error: null,
                user: { found: true, token: token, userId: user.id },
              });
            } else {
              res.status(401).json({ error: "Incorrect password" });
            }
          })
          .catch((error) => {
            console.error("Error comparing passwords:", error);
            res.status(500).json({ error: "Internal server error" });
          });
      } else {
        res.status(401).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

export { signUserUp, logUserIn };
