import { injectable } from "inversify";
import jwt from "jsonwebtoken";

@injectable()
export class TokenServices {
  async createToken(id: string) {
    const token = jwt.sign({ id }, process.env.TOKEN_SECERT_KEY, {
      expiresIn: "24h",
    });
    return token;
  }
}
