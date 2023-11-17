import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";
dotenv.config();
const mongoURL = process.env.MONGO_URL!;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

mongoose.connect(mongoURL).then(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
