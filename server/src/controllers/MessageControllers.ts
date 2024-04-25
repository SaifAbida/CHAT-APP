import { MessageService } from "../services/MessageService";
import { injectable,inject } from "inversify";

@injectable()
export class MessageControllers {
    constructor(@inject(MessageService) private readonly messageService:MessageService){}
    
}