import { Request } from "express";

interface userRequest {
  id: string;
}

export interface AuthentificatedRequest extends Request {
  user: userRequest;
}
