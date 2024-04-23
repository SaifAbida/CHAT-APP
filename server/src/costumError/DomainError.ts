import HttpStatusCodes from "../HttpStatusCode/HttpStatusCode";

export class DomaineError extends Error {
  constructor(message: string, public status: HttpStatusCodes) {
    super(message);
  }
}
