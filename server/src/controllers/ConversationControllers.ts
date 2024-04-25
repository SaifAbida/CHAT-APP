import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { ConversationServices } from "../services/ConversationService";
import { inject, injectable } from "inversify";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import { Response } from "express";
import { VerifyLogin } from "../middleware/VerifyLogin";

@JsonController("/conversation")
@injectable()
export class ConversationControllers {
  constructor(
    @inject(ConversationServices)
    private readonly conversationServices: ConversationServices
  ) {}

  @Post("/:id")
  @UseBefore(VerifyLogin)
  async createConversation(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response,
    @Body() requestBody: { name?: string }
  ) {
    const conversation = await this.conversationServices.createConversation(
      req.user.id,
      id,
      requestBody.name
    );
    return res.status(200).json(conversation);
  }

  @Get("/")
  @UseBefore(VerifyLogin)
  async getConversations(
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    const conversations = await this.conversationServices.getConversations(
      req.user.id
    );
    return res.status(200).json(conversations);
  }

  @Get("/:id")
  @UseBefore(VerifyLogin)
  async getConversation(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    const conversation = await this.conversationServices.getConversation(
      id,
      req.user.id
    );
    return res.status(200).json(conversation);
  }

  @Delete("/:id")
  @UseBefore(VerifyLogin)
  async deleteConversation(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    await this.conversationServices.deleteConversation(id, req.user.id);
    return res
      .status(200)
      .json({ message: "Conversation deleted successfully" });
  }

  @Put("/:id")
  @UseBefore(VerifyLogin)
  async updateConversation(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Body() requestBody: { name?: string },
    @Res() res: Response
  ) {
    const conversation = await this.conversationServices.updateConversationName(
      req.user.id,
      id,
      requestBody.name
    );
    return res.status(200).json(conversation);
  }
}
