import mongoose from "mongoose";
import { MessageRepository } from "../Repositories/MessageRepository";
import { inject, injectable } from "inversify";
import { NotFoundError, UnauthorizedError } from "../costumError/CustomErrors";

@injectable()
export class MessageService {
  constructor(
    @inject(MessageRepository)
    private readonly messageRepository: MessageRepository
  ) {}

  async createMessage(
    conversation_id: string,
    sender_id: string,
    content: string
  ) {
    return await this.messageRepository.create(
      conversation_id,
      sender_id,
      content
    );
  }
  async getMessage(sender_id: string, conversation_id: string) {
    const message = await this.messageRepository.findOne(conversation_id);
    if (!message) {
      throw new NotFoundError();
    }

    const senderObjID = new mongoose.Types.ObjectId(sender_id);
    if (senderObjID !== message.sender_id) {
      throw new UnauthorizedError();
    }
    return message;
  }
  async getMessages(sender_id: string) {
    return await this.messageRepository.findAll(sender_id);
  }
  async deleteMessage(sender_id: string, message_id: string) {
    const message = await this.messageRepository.findOne(message_id);
    if (!message) {
      throw new NotFoundError();
    }
    const senderObjID = new mongoose.Types.ObjectId(sender_id);
    if (senderObjID !== message.sender_id) {
      throw new UnauthorizedError();
    }
    await this.messageRepository.delete(message_id);
  }
  async updateMessageContent(
    sender_id: string,
    message_id: string,
    content: string
  ) {
    const message = await this.messageRepository.findOne(message_id);
    if (!message) {
      throw new NotFoundError();
    }
    const senderObjID = new mongoose.Types.ObjectId(sender_id);
    if (senderObjID !== message.sender_id) {
      throw new UnauthorizedError();
    }

    const updatedMessage = { ...message, content };
    return await this.messageRepository.update(message_id, updatedMessage);
  }
}
