import bcrypt from "bcrypt";
import { injectable } from "inversify";

@injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
