import { injectable } from "inversify";
import { MessageInterface } from "../interfaces/MessageInterface";
import { messageType } from "../modules/messageModule";
import { Message } from "../modules/messageModule";
import mongoose from "mongoose";

@injectable()
export class MessageRepository implements MessageInterface<messageType> {
  private readonly database = Message;
  async create(
    conversation_id: string,
    sender_id: string,
    content: string
  ): Promise<messageType> {
    const newMessage = new this.database({
      conversation_id: new mongoose.Types.ObjectId(conversation_id),
      sender_id: new mongoose.Types.ObjectId(sender_id),
      content,
    });
    return (await newMessage.save()) as unknown as messageType;
  }
  async findOne(id: string): Promise<messageType | null> {
    return await this.database.findById(id);
  }
  async findAll(sender_id: string): Promise<messageType[]> {
    return await this.database.find({
      sender_id: new mongoose.Types.ObjectId(sender_id),
    });
  }
  async update(id: string, item: messageType): Promise<messageType> {
    return await this.database.findByIdAndUpdate(id, item, { new: true });
  }
  async delete(id: string): Promise<boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
