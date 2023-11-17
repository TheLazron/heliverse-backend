import { z } from "zod";
import { Domain, Gender } from "../models/users";

const createUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().max(40),
  lastName: z.string().max(40),
  avatar: z.string().url(),
  domain: z.nativeEnum(Domain),
  gender: z.nativeEnum(Gender),
  available: z.string(),
});

const updateUserSchema = z
  .object({
    firstName: z.string().max(40).optional(),
    lastName: z.string().max(40).optional(),
    avatar: z.string().url().optional(),
    domain: z.nativeEnum(Domain).optional(),
    gender: z.nativeEnum(Gender).optional(),
    available: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const values = Object.values(data);
      const atLeastOneValuePresent = values.some(
        (value) => value !== undefined
      );
      return atLeastOneValuePresent;
    },
    {
      message: "At least one field should be provided for updating the user.",
    }
  );

export { createUserSchema, updateUserSchema };
