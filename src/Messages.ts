import Session from "./Session.js";
import Utils from "./Utils.js";
import SPHError, {ErrorCode} from "./lib/SPHError.js";

export interface Receiver {
    name: string;
    id?: string;
    role: string|undefined;
}

export interface Message {
    id: string;
    uuid: string;
    sender: {
        id: string;
        name: string;
        role: string|undefined;
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
    deleteDate?: number|undefined;
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
    replies: Message[];
}

export interface ChatDetails {
    date: number;
    options: {
        groupOnly: boolean;
        privateAnswerOnly: boolean;
        noAnswerAllowed: boolean;
        allowSuSToSuSMessages: boolean;
    };
    self: {
        id: string;
        role: string|undefined;
    };
    initialMessage: Message;
}

export default class Messages {
    session: Session;

    constructor(session: Session) {
        this.session = session;
    }

    async fetchChats(filter = "visible"): Promise<Message[]> {
        const formData = new URLSearchParams();
        formData.append("a", "headers");
        if (filter === "all")
            formData.append("getType", "All");
        else if (filter === "hidden")
            formData.append("getType","unvisibleOnly");
        else
            formData.append("getType", "visibleOnly");
        formData.append("last", "0");

        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
            {
                method: "POST",
                headers: Session.Headers,
                body: (formData).toString(),
            });

        const data = await req.json();
        return JSON.parse(await this.session.crypto.decryptAES(data.rows, this.session.sessionKey)).map((row: any): Message => {
            const sender: any = this.#parseReceiver(row.SenderName);
            sender.id = row.Sender;

            return {
                id: row.Id,
                uuid: row.Uniquid,
                sender,
                subject: Utils.unescapeHTML(row.Betreff),
                deleted: row.Papierkorb === "ja",
                private: row.private,
                receivers: this.#parseAdditionalReceivers(row.empf.join()) ?? [],
                additionalReceivers: this.#parseAdditionalReceivers(row.WeitereEmpfaenger) ?? [],
                initials: row.kuerzel,
                date: row.DatumUnix * 1000,
                unread: row.unread !== undefined,
                replies: []
            }
        });
    }

    async fetchChatMessages(uuid: string): Promise<ChatDetails> {
        const formData = new URLSearchParams();
        formData.append("a", "read");
        formData.append("uniqid", await this.session.crypto.encryptAES(uuid, this.session.sessionKey));

        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
            {
                method: "POST",
                headers: Session.Headers,
                body: formData.toString(),
            });

        const data = await req.json();

        return {
            date: data.time * 1000,
            options: {
                groupOnly: data.options.groupOnly === "ja",
                privateAnswerOnly: data.options.privateAnswerOnly === "ja",
                noAnswerAllowed: data.options.noAnswerAllowed === "ja",
                allowSuSToSuSMessages: data.ToolOptions.AllowSuSToSuSMessages === "on",
            },
            self: {
                id: data.userId,
                role: data.UserTyp === "Teilnehmer" ? "student" : (data.UserTyp === "Betreuer" ? "teacher" : (data.UserTyp === "Eltern" ? "parent" : undefined))
            },
            initialMessage: this.#parseMessage(JSON.parse(await this.session.crypto.decryptAES(data.message, this.session.sessionKey)))
        };
    }

    async hideMessage(uuid: string): Promise<boolean> {
        const formData = new URLSearchParams();
        formData.append("a", "deleteAll");
        formData.append("uniqid", uuid);

        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
            {
                method: "POST",
                headers: Session.Headers,
                body: formData.toString(),
            });

        return await req.text() === "true";
    }

    async showMessage(uuid: string): Promise<boolean> {
        const formData = new URLSearchParams();
        formData.append("a", "recycleMsg");
        formData.append("uniqid", uuid);

        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
            {
                method: "POST",
                headers: Session.Headers,
                body: formData.toString(),
            });

        return await req.text() === "true";
    }

    async searchReceiver(query: string): Promise<Receiver[]> {
        if (query.length < 2)
            throw new SPHError(ErrorCode.MinLengthForQuery)

        const formData = new URLSearchParams();
        formData.append("q", query);
        formData.append("page", "1");
        formData.append("a", "searchRecipt");

        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php?"
            + formData.toString());

        return (await req.json()).items.map((i: any) => {
            const roleRaw = i.logo.replace("fa fa-", "");
            return {
                name: i.text,
                id: i.id,
                role: (roleRaw === "users" || roleRaw === "child") ? "student" : (roleRaw === "user-circle" ? "parent" : (roleRaw === "user" ? "teacher" : undefined))
            }
        });
    }

    async createNewChat(receivers: string[], subject: string, content: string, type = undefined): Promise<string> {
        const messageData = [];
        receivers.forEach(receiver => {
            messageData.push({name: "to[]", value: receiver});
        })
        messageData.push({name: "subject", value: subject});
        messageData.push({name: "text", value: content});
        if (type !== undefined) {
            /*
			* noAnswerAllowed: Keine Antworten möglich
			* privateAnswerOnly: Antworten nur an Absender möglich
			* groupOnly: Antworten immer an alle
			* openChat: Antworten an alle oder eine einzelne Person (auswählbar)
			*/
            messageData.push({name: "Art", value: type});
        }

        const formData = new URLSearchParams();
        formData.append("a", "newmessage");
        formData.append("c", await this.session.crypto.encryptAES(JSON.stringify(messageData), this.session.sessionKey));

        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
            {
                method: "POST",
                headers: Session.Headers,
                body: formData.toString(),
            });

        const data = await req.json();

        if (!data.back) {
            throw new SPHError(ErrorCode.SPHRejected);
        }

        return data.id;
    }

    async replyToChat(uuid: string, content: string, receiver: string = "all"): Promise<string> {
        const formData = new URLSearchParams();
        formData.append("a", "reply");
        formData.append("c", await this.session.crypto.encryptAES(JSON.stringify({
            to: receiver, // Muss genauer erproben wie sich das in der Nachricht wiederspiegelt
            message: content,
            replyToMsg: uuid,
        }), this.session.sessionKey));

        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
            {
                method: "POST",
                headers: Session.Headers,
                body: formData.toString(),
            });

        const data = await req.json();

        if (!data.back) {
            throw new SPHError(ErrorCode.SPHRejected);
        }

        return data.id;
    }

    #parseAdditionalReceivers(raw: any) : Receiver[]|undefined {
        if (raw === null || raw === undefined)
            return undefined;

        return raw.split("</span>").map((r: string) => this.#parseReceiver(r)).filter((r: any) => r !== undefined && r.name !== "");
    }

    #parseReceiver(r: any): Receiver|undefined {
        if (r === undefined || r === null || r === "") {
            return undefined;
        }

        r = r.replace("</span>", "");
        const roleRaw = r.split("class=\"fas fa-")[1].split("\"></i>")[0];
        return {
            name: r.split("</i> ")[1].trim(),
            role: (roleRaw === "users" || roleRaw === "child") ? "student" : (roleRaw === "user-circle" ? "parent" : (roleRaw === "user" ? "teacher" : undefined))
        }
    }

    #parseMessage(msg: any) : Message {
        return {
            id: msg.Id,
            uuid: msg.Uniquid,
            sender: {
                id: msg.Sender,
                role: msg.SenderArt === "Teilnehmer" ? "student" : (msg.SenderArt === "Betreuer" ? "teacher" : (msg.SenderArt === "Eltern" ? "parent" : undefined)),
                name: msg.username
            },
            options: {
                groupOnly: msg.message === "ja",
                privateAnswerOnly: msg.privateAnswerOnly === "ja",
                noAnswerAllowed: msg.noAnswerAllowed === "ja",
                respondToDeleted: msg.AntwortAufAusgeblendeteNachricht === "on",
            },
            subject: Utils.unescapeHTML(msg.Betreff),
            date: Utils.parseStringDate(msg.Datum),
            content: Utils.unescapeHTML(msg.Inhalt.replaceAll("<br />", "")),
            receivers: this.#parseAdditionalReceivers(msg.empf === "" ? undefined : msg.empf.join()) ?? [],
            additionalReceivers: this.#parseAdditionalReceivers(msg.WeitereEmpfaenger) ?? [],
            users: {
                students: msg.statistik.teilnehmer,
                teachers: msg.statistik.betreuer,
                parents: msg.statistik.eltern
            },
            ownMessage: msg.own,
            deleteDate: msg.Delete === "" ? undefined : Utils.parseStringDate(msg.Delete),
            markedAsDeleted: msg.Papierkorb === "ja",
            private: msg.private,
            unread: msg.ungelesen,
            replies: msg.reply.map((reply: any) => this.#parseMessage(reply)),
        }
    }
}