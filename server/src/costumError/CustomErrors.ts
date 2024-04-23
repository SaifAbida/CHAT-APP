import { DomaineError } from "./DomainError";
import HttpStatusCodes from "../HttpStatusCode/HttpStatusCode";

export class NotFoundError extends DomaineError {
  constructor() {
    super("Not Found", HttpStatusCodes.NotFound);
  }
}

export class UnauthorizedError extends DomaineError {
  constructor() {
    super("Unauthorized", HttpStatusCodes.Unauthorized);
  }
}
