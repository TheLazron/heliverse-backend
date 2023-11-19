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
          errorResponseHandler(500, res, err, "Error signing up user");
        });
    })
    .catch((err) => {
      errorResponseHandler(500, res, err, "Error signing up user");
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
                data: { found: true, token: token, user: user },
              });
            } else {
              errorResponseHandler(401, res, undefined, `Incorrect password`);
            }
          })
          .catch((error) => {
            console.error("Error comparing passwords:", error);
            errorResponseHandler(500, res, error, `Internal server error`);
            res.status(500).json({ error: "Internal server error" });
          });
      } else {
        errorResponseHandler(401, res, undefined, `User not found`);
      }
    })
    .catch((error) => {
      errorResponseHandler(500, res, error, `Internal server error`);
    });
};

export { signUserUp, logUserIn };
