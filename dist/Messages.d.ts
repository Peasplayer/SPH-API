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
    subject: string;
    deleted: boolean;
    private: string;
    receivers: Receiver[];
    additionalReceivers: Receiver[];
    initials: string;
    date: number;
    unread: boolean;
}
export default class Messages {
    #private;
    session: Session;
    constructor(session: Session);
    fetchChats(filter?: string): Promise<any>;
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
    }>;
    hideMessage(uuid: string): Promise<boolean>;
    showMessage(uuid: string): Promise<boolean>;
    searchReceiver(query: string): Promise<any>;
    createNewChat(receivers: string[], subject: string, content: string, type?: undefined): Promise<any>;
    replyToChat(uuid: string, content: string, receiver?: string): Promise<any>;
}
