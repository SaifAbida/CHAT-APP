import { injectable } from "inversify";
import { RepoInterface } from "../interfaces/RepoInterface";
import { messageType } from "../modules/messageModule";
import { Message } from "../modules/messageModule";

@injectable()
export class MessageRepository implements RepoInterface<messageType> {
  private readonly database = Message;
  async create(item: messageType): Promise<messageType> {
    const newMessage = new this.database(item);
    return (await newMessage.save()) as unknown as messageType;
  }
  async findOne(id: string): Promise<messageType | null> {
    return await this.database.findById(id);
  }
  async findAll(): Promise<messageType[]> {
    return await this.database.find();
  }
  async update(id: string, item: messageType): Promise<messageType> {
    return await this.database.findByIdAndUpdate(id, item, { new: true });
  }
  async delete(id: string): Promise<boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
