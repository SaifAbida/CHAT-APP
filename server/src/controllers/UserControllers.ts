import {
  Body,
  Delete,
  Get,
  JsonController,
  Post,
  Put,
  Req,
  Res,
} from "routing-controllers";
import { UserServices } from "../services/UserServices";
import { inject, injectable } from "inversify";
import { Response } from "express";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import { LoginValidators, userValidators } from "../Validators/UserValidators";

@JsonController("/user")
@injectable()
export class UserControllers {
  constructor(
    @inject(UserServices) private readonly userServices: UserServices
  ) {}

  @Post("/register")
  async register(@Body() item: userValidators, @Res() res: Response) {
    const user = await this.userServices.register(item);
    return res.status(200).json(user);
  }

  @Post("/login")
  async login(@Body() credentials: LoginValidators, @Res() res: Response) {
    const token = await this.userServices.login(credentials);
    return res.status(200).json(token);
  }

  @Get("/")
  async getUser(@Req() req: AuthentificatedRequest, @Res() res: Response) {
    const user = await this.userServices.getUser(req.user.id);
    return res.status(200).json(user);
  }

  @Put("/")
  async updateUser(
    @Body() item: userValidators,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    const user = await this.userServices.updateUser(req.user.id, item);
    return res.status(200).json(user);
  }

  @Delete("/")
  async deleteUser(@Req() req: AuthentificatedRequest, @Res() res: Response) {
    await this.userServices.deleteUser(req.user.id);
    return res.status(200).json("User deleted successfully");
  }
}
