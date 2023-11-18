import { Response } from "express";
import { ZodError, z } from "zod";

const errorResponseHandler = (
  status: number,
  res: Response,
  error?: Error | z.ZodError,
  message?: String
) => {
  console.log(error);

  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues, data: null });
    return;
  }

  res.status(status).json({ error: message, data: null });
  return;
};

export default errorResponseHandler;
