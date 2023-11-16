import { Response as ExpressResponse } from "express";

// Raw Interfaces
interface loginResponse {
  error: string | null;
  user: {
    found: boolean;
    token: string | null;
    userId: string | null;
  };
}

//Extended Responses

interface customResponse extends Response {
  email?: string;
  userId?: string;
}
interface Response extends ExpressResponse {
  email?: string;
  userId?: string;
}

export { loginResponse, customResponse, Response };
