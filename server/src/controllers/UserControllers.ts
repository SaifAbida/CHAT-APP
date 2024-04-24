import {
  Body,
  Delete,
  Get,
  JsonController,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { UserServices } from "../services/UserServices";
import { inject, injectable } from "inversify";
import { Response } from "express";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import {
  LoginValidators,
  PasswordResetValidators,
  RegisterValidators,
  UpdateValidators,
} from "../Validators/UserValidators";
import { VerifyLogin } from "../middleware/VerifyLogin";

@JsonController("/user")
@injectable()
export class UserControllers {
  constructor(
    @inject(UserServices) private readonly userServices: UserServices
  ) {}

  @Post("/register")
  async register(@Body() item: RegisterValidators, @Res() res: Response) {
    const user = await this.userServices.register(item);
    return res.status(200).json(user);
  }

  @Post("/login")
  async login(@Body() credentials: LoginValidators, @Res() res: Response) {
    const token = await this.userServices.login(credentials);
    return res.status(200).json({ token });
  }

  @Get("/")
  @UseBefore(VerifyLogin)
  async getUser(@Req() req: AuthentificatedRequest, @Res() res: Response) {
    const user = await this.userServices.getUser(req.user.id);
    return res.status(200).json(user);
  }

  @Put("/update")
  @UseBefore(VerifyLogin)
  async updateUser(
    @Body() item: UpdateValidators,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    const user = await this.userServices.updateUser(req.user.id, item);
    return res.status(200).json(user);
  }

  @Patch("/reset")
  @UseBefore(VerifyLogin)
  async resetPassword(
    @Body() item: PasswordResetValidators,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    await this.userServices.passwordReset(req.user.id, item);
    return res.status(200).json({ message: "Password changed successfully" });
  }

  @Delete("/")
  @UseBefore(VerifyLogin)
  async deleteUser(@Req() req: AuthentificatedRequest, @Res() res: Response) {
    await this.userServices.deleteUser(req.user.id);
    return res.status(200).json({ message: "User deleted successfully" });
  }
}
