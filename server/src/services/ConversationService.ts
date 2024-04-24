import { ConversationRepository } from "../Repositories/ConversationRepository";
import { inject, injectable } from "inversify";
import { conversationType } from "../modules/conversationModule";
import { NotFoundError, UnauthorizedError } from "../costumError/CustomErrors";
import mongoose from "mongoose";

@injectable()
export class ConversationServices {
  constructor(
    @inject(ConversationRepository)
    private readonly conversationRepository: ConversationRepository
  ) {}

  async createConversation(
    id1: string,
    id2: string,
    name?: string
  ): Promise<conversationType> {
    return await this.conversationRepository.create(id1, id2, name);
  }

  async getConversation(
    ConversationID: string,
    userID: string
  ): Promise<conversationType | null> {
    const conversation = await this.conversationRepository.findOne(
      ConversationID
    );
    if (!conversation) {
      throw new NotFoundError();
    }
    const userObjID = new mongoose.Types.ObjectId(userID);
    if (!conversation.participants.includes(userObjID)) {
      throw new UnauthorizedError();
    }
    return conversation;
  }

  async getConversations(id: string): Promise<conversationType[]> {
    return await this.conversationRepository.findAll(id);
  }

  async updateConversations(
    id: string,
    item: conversationType
  ): Promise<conversationType> {
    const updatedConversation = await this.conversationRepository.update(
      id,
      item
    );
    if (!updatedConversation) {
      throw new NotFoundError();
    }
    return updatedConversation;
  }

  async deleteConversation(
    ConversationID: string,
    userID: string
  ): Promise<boolean> {
    const conversation = await this.conversationRepository.findOne(
      ConversationID
    );
    if (!conversation) {
      throw new NotFoundError();
    }
    const userObjID = new mongoose.Types.ObjectId(userID);
    if (!conversation.participants.includes(userObjID)) {
      throw new UnauthorizedError();
    }
    return await this.conversationRepository.delete(ConversationID);
  }
}
