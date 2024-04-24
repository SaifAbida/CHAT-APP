import { injectable } from "inversify";
import { UserInterface } from "../interfaces/UserInterface";
import { User } from "../modules/userModule";
import { userType } from "../modules/userModule";
import { Document } from "mongoose";

@injectable()
export class UserRepository implements UserInterface<userType> {
  private readonly database = User;
  async create(item: userType): Promise<userType> {
    const newUser = new this.database(item);
    return (await newUser.save()) as unknown as userType;
  }
  async findOne(id: string): Promise<userType | null> {
    return await this.database.findById(id);
  }
  async findByUsername(username: string): Promise<userType | null> {
    return await this.database.findOne({ username });
  }
  async findAll(): Promise<userType[]> {
    return await this.database.find();
  }
  async update(
    id: string,
    item: { username: string; email: string }
  ): Promise<userType> {
    return await this.database.findByIdAndUpdate(id, item, { new: true });
  }
  
  async save(item: userType): Promise<userType | null> {
    const userDocument = item as Document & userType;
    await userDocument.save();
    return item;
  }

  async delete(id: string): Promise<boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
