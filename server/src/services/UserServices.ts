import { inject, injectable } from "inversify";
import { UserRepository } from "../Repositories/UserRepository";
import { userType } from "../modules/userModule";
import { PasswordService } from "./PasswordService";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../costumError/CustomErrors";
import { TokenServices } from "./TokenService";
import bcrypt from "bcrypt";
import { Document } from "mongoose";

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
  async updateUser(
    id: string,
    item: { username: string; email: string }
  ): Promise<userType> {
    const user = await this.userRepository.update(id, item);
    if (!user) {
      throw new NotFoundError();
    }
    return user;
  }
  async passwordReset(
    id: string,
    item: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }
  ) {
    const user = await this.userRepository.findOne(id);
    const verifyCurrentPassword = await this.passwordService.verifyPassword(
      item.currentPassword,
      user.password
    );
    if (!verifyCurrentPassword) {
      throw new BadRequestError();
    }
    const verifyNewPassword = await this.passwordService.verifyPassword(
      item.newPassword,
      user.password
    );
    if (verifyNewPassword) {
      throw new BadRequestError();
    }
    if (item.newPassword !== item.confirmPassword) {
      throw new BadRequestError();
    }
    const newHashedPassword = await this.passwordService.hashPassword(
      item.newPassword
    );
    user.password = newHashedPassword;
    return await this.userRepository.save(user);
  }
  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.delete(id);
    if (!user) {
      throw new NotFoundError();
    }
    return true;
  }
}
