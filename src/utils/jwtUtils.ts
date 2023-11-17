import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import type { customResponse } from "../types/responseTypes";

const generateAccessToken = (email: String, userId: string): string => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ email, userId }, secret, { expiresIn: "1800s" });
};

const parseJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const verifyJWT = (token: string, res: customResponse, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET!;

    const decoded = jwt.verify(token, secret);
    if (decoded) {
      const parsedToken = parseJwt(token);
      const email = parsedToken.email;
      const userId = parsedToken.userId;
      res.email = email;
      res.userId = userId;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "JWT token not verified" });
  }
};

const verifyToken = (req: Request, res: customResponse, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("provide token");
    return res
      .status(401)
      .json({ message: "Provide with a valid authentication token" });
  }

  verifyJWT(token, res, next);
};

export { generateAccessToken, parseJwt, verifyJWT, verifyToken };
