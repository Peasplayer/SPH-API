import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
interface Receiver {
    name: string;
    role: string | undefined;
}
export default class Messages {
    #private;
    session: Session;
    constructor(session: Session);
    fetchChats(filter?: string): Promise<ReturnObject<any>>;
    fetchChatMessages(uuid: string): Promise<ReturnObject<Error> | ReturnObject<{
        date: number;
        options: {
            groupOnly: boolean;
            privateAnswerOnly: boolean;
            noAnswerAllowed: boolean;
            allowSuSToSuSMessages: boolean;
        };
        self: {
            id: any;
            role: string | undefined;
        };
        initialMessage: {
            id: any;
            uuid: any;
            sender: {
                id: any;
                role: string | undefined;
                name: any;
            };
            options: {
                groupOnly: boolean;
                privateAnswerOnly: boolean;
                noAnswerAllowed: boolean;
                respondToDeleted: boolean;
            };
            subject: string;
            date: number;
            content: string;
            receivers: Receiver[] | undefined;
            additionalReceivers: Receiver[] | undefined;
            users: {
                students: any;
                teachers: any;
                parents: any;
            };
            ownMessage: any;
            deleteDate: number | undefined;
            markedAsDeleted: boolean;
            private: any;
            unread: any;
            replies: any;
        };
    }>>;
    hideMessage(uuid: string): Promise<ReturnObject<Error> | ReturnObject<boolean>>;
    showMessage(uuid: string): Promise<ReturnObject<Error> | ReturnObject<boolean>>;
    searchReceiver(query: string): Promise<ReturnObject<any>>;
    createNewChat(receivers: string[], subject: string, content: string, type?: undefined): Promise<ReturnObject<any>>;
    replyToChat(uuid: string, content: string, receiver?: string): Promise<ReturnObject<any>>;
}
export {};
