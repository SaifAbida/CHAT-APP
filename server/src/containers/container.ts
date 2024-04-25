import { Container } from "inversify";
import { UserRepository } from "../Repositories/UserRepository";
import { UserServices } from "../services/UserServices";
import { PasswordService } from "../services/PasswordService";
import { TokenServices } from "../services/TokenService";
import { UserControllers } from "../controllers/UserControllers";
import { VerifyLogin } from "../middleware/VerifyLogin";
import { ConversationRepository } from "../Repositories/ConversationRepository";
import { ConversationServices } from "../services/ConversationService";
import { ConversationControllers } from "../controllers/ConversationControllers";

export const container = new Container();

container.bind<UserRepository>(UserRepository).toSelf();
container.bind<PasswordService>(PasswordService).toSelf();
container.bind<TokenServices>(TokenServices).toSelf();
container.bind<UserServices>(UserServices).toSelf();
container.bind<VerifyLogin>(VerifyLogin).toSelf();
container.bind<UserControllers>(UserControllers).toSelf();
container.bind<ConversationRepository>(ConversationRepository).toSelf();
container.bind<ConversationServices>(ConversationServices).toSelf();
container.bind<ConversationControllers>(ConversationControllers).toSelf();
