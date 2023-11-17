import { z } from "zod";
import { Schema } from "mongoose";

const createTeamSchema = z.object({
  name: z.string().min(3),
  members: z.array(z.string()),
});

export { createTeamSchema };
