import { inject, injectable } from "inversify";
import { UserRepository } from "../Repositories/UserRepository";
import { userType } from "../modules/userModule";
import { PasswordService } from "./PasswordService";
import { NotFoundError, UnauthorizedError } from "../costumError/CustomErrors";
import { TokenServices } from "./TokenService";
import bcrypt from "bcrypt";

@injectable()
export class UserServices {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(PasswordService) private readonly passwordService: PasswordService,
    @inject(TokenServices) private readonly tokenService: TokenServices
  ) {}

  async register(item: userType): Promise<userType> {
    const hashedPassword = await this.passwordService.hashPassword(
      item.password
    );
    item.password = hashedPassword;
    return await this.userRepository.create(item);
  }
  async login(credentials: { username: string; password: string }) {
    const existingUser = await this.userRepository.findByUsername(
      credentials.username
    );
    if (!existingUser) {
      throw new NotFoundError();
    }
    const verifyPassword = await bcrypt.compare(
      credentials.password,
      existingUser.password
    );
    if (!verifyPassword) {
      throw new UnauthorizedError();
    }
    return await this.tokenService.createToken(existingUser._id);
  }
  async getUser(id: string): Promise<userType> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError();
    }
    return user;
  }
  async updateUser(id: string, item: userType): Promise<userType> {
    const user = await this.userRepository.update(id, item);
    if (!user) {
      throw new NotFoundError();
    }
    return user;
  }
  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.delete(id);
    if (!user) {
      throw new NotFoundError();
    }
    return true;
  }
}
