import Session from "./Session.js";
export interface Receiver {
    name: string;
    role: string | undefined;
}
export interface Message {
    id: string;
    uuid: string;
    sender: {
        id: string;
        name: string;
        role: string | undefined;
    };
    options?: {
        groupOnly: boolean;
        privateAnswerOnly: boolean;
        noAnswerAllowed: boolean;
        respondToDeleted: boolean;
    };
    subject: string;
    content?: string;
    deleted?: boolean;
    deleteDate?: number | undefined;
    markedAsDeleted?: boolean;
    private: string;
    receivers: Receiver[];
    additionalReceivers: Receiver[];
    users?: {
        students: number;
        teachers: number;
        parents: number;
    };
    ownMessage?: boolean;
    initials?: string;
    date: number;
    unread: boolean;
    replies?: Message[];
}
export default class Messages {
    #private;
    session: Session;
    constructor(session: Session);
    fetchChats(filter?: string): Promise<Message[]>;
    fetchChatMessages(uuid: string): Promise<{
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
        initialMessage: Message;
    }>;
    hideMessage(uuid: string): Promise<boolean>;
    showMessage(uuid: string): Promise<boolean>;
    searchReceiver(query: string): Promise<any>;
    createNewChat(receivers: string[], subject: string, content: string, type?: undefined): Promise<any>;
    replyToChat(uuid: string, content: string, receiver?: string): Promise<any>;
}
