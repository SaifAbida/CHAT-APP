import { Conversation } from "../modules/conversationModule";
import { conversationType } from "../modules/conversationModule";
import { injectable } from "inversify";
import { RepoInterface } from "../interfaces/RepoInterface";

@injectable()
export class ConversationRepository implements RepoInterface<conversationType> {
  private readonly database = Conversation;

  async create(item: conversationType): Promise<conversationType> {
    const newConversation = new this.database(item);
    return (await newConversation.save()) as unknown as conversationType;
  }
  async findOne(id: string): Promise<conversationType | null> {
    return await this.database.findById(id);
  }
  async findAll(): Promise<conversationType[]> {
    return await this.database.find();
  }
  async update(id: string, item: conversationType): Promise<conversationType> {
    return await this.database.findByIdAndUpdate(id, item, { new: true });
  }
  async delete(id: string): Promise<boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
