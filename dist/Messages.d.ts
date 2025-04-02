import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
export default class Messages {
    #private;
    session: Session;
    constructor(session: Session);
    fetchChats(filter?: string): Promise<ReturnObject>;
    fetchChatMessages(uuid: string): Promise<ReturnObject>;
    hideMessage(uuid: string): Promise<ReturnObject>;
    showMessage(uuid: string): Promise<ReturnObject>;
    searchReceiver(query: string): Promise<ReturnObject>;
    createNewChat(receivers: string[], subject: string, content: string, type?: undefined): Promise<ReturnObject>;
    replyToChat(uuid: string, content: string): Promise<ReturnObject>;
}
