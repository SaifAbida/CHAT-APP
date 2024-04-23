import jwt from "jsonwebtoken";

export class TokenServices {
  async createToken(id: string) {
    const token = jwt.sign({ id }, process.env.TOKEN_SECERT_KEY, {
      expiresIn: "24h",
    });
    return token;
  }
}
