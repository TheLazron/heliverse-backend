import { Schema, Document, model } from "mongoose";

export enum Gender {
  male = "Male",
  female = "Female",
  polygender = "Polygender",
  agender = "Agender",
  bigender = "Bigender",
}

export enum Domain {
  sales = "Sales",
  uiDesign = "UI Design",
  finance = "Finance",
  management = "Management",
  marketing = "Marketing",
  businessDevelopment = "Business Development",
  it = "IT",
}

export interface UserInterface extends Document {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
  gender: Gender;
  avatar: string;
  domain: Domain;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    enum: Object.values(Domain),
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

export default model<UserInterface>("User", UserSchema);
