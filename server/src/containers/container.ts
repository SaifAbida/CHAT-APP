import { Container } from "inversify";
import { UserRepository } from "../Repositories/UserRepository";
import { UserServices } from "../services/UserServices";
import { UserControllers } from "../controllers/UserControllers";

export const container = new Container();

container.bind<UserRepository>(UserRepository).toSelf();
container.bind<UserServices>(UserServices).toSelf();
container.bind<UserControllers>(UserControllers).toSelf();
