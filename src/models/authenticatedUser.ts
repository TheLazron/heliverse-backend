import { Schema, Document, model } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  password: string;
  username: string;
}

const AuthUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default model<UserInterface>("AuthUser", AuthUserSchema);
