import { Conversation } from "../modules/conversationModule";
import { conversationType } from "../modules/conversationModule";
import { injectable } from "inversify";
import { ConversationInterface } from "../interfaces/ConversationInterface";
import mongoose from "mongoose";

@injectable()
export class ConversationRepository
  implements ConversationInterface<conversationType>
{
  private readonly database = Conversation;

  async create(
    id1: string,
    id2: string,
    name?: string
  ): Promise<conversationType> {
    const newConversation = new this.database({
      participants: [
        new mongoose.Types.ObjectId(id1),
        new mongoose.Types.ObjectId(id2),
      ],
      name,
    });
    return (await newConversation.save()) as unknown as conversationType;
  }

  async findOne(id: string): Promise<conversationType | null> {
    return await this.database.findById(id);
  }
  async findAll(id: string): Promise<conversationType[]> {
    return await this.database.find({
      participants: new mongoose.Types.ObjectId(id),
    });
  }
  async update(id: string, item: conversationType): Promise<conversationType> {
    return await this.database.findByIdAndUpdate(id, item, { new: true });
  }
  async delete(id: string): Promise<boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
