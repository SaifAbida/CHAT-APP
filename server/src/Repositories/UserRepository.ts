import { injectable } from "inversify";
import { RepoInterface } from "../interfaces/RepoInterface";
import { User } from "../modules/userModule";
import { userType } from "../modules/userModule";

@injectable()
export class UserRepository implements RepoInterface<userType> {
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
  async update(id: string, item: userType): Promise<userType> {
    return await this.database.findByIdAndUpdate(id, item, { new: true });
  }
  async delete(id: string): Promise<boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
