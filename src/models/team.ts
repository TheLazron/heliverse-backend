import { Schema, Document, model } from "mongoose";

export interface TeamInterface extends Document {
  name: string;
  members: string[];
}

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default model<TeamInterface>("Team", TeamSchema);
