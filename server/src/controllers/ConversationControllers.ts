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
} from "routing-controllers";
import { ConversationServices } from "../services/ConversationService";
import { inject, injectable } from "inversify";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import { Response } from "express";

@JsonController("/conversation")
@injectable()
export class ConversationControllers {
  constructor(
    @inject(ConversationServices)
    private readonly conversationServices: ConversationServices
  ) {}

  @Post("/:id")
  async createConversation(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response,
    @Body() name?: string
  ) {
    const conversation = await this.conversationServices.createConversation(
      req.user.id,
      id,
      name
    );
    return res.status(200).json(conversation);
  }

  @Get("/")
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

  @Delete("/id")
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

}
