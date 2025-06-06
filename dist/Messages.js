import Session from "./Session.js";
import Utils from "./Utils.js";
import SPHError, { ErrorCode } from "./lib/SPHError.js";
export default class Messages {
    session;
    constructor(session) {
        this.session = session;
    }
    async fetchChats(filter = "visible") {
        const formData = new URLSearchParams();
        formData.append("a", "headers");
        if (filter === "all")
            formData.append("getType", "All");
        else if (filter === "hidden")
            formData.append("getType", "unvisibleOnly");
        else
            formData.append("getType", "visibleOnly");
        formData.append("last", "0");
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php", {
            method: "POST",
            headers: Session.Headers,
            body: (formData).toString(),
        });
        const data = await req.json();
        return JSON.parse(await this.session.crypto.decryptAES(data.rows, this.session.sessionKey)).map((row) => {
            const sender = this.#parseReceiver(row.SenderName);
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
            };
        });
    }
    async fetchChatMessages(uuid) {
        const formData = new URLSearchParams();
        formData.append("a", "read");
        formData.append("uniqid", await this.session.crypto.encryptAES(uuid, this.session.sessionKey));
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php", {
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
    async hideMessage(uuid) {
        const formData = new URLSearchParams();
        formData.append("a", "deleteAll");
        formData.append("uniqid", uuid);
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php", {
            method: "POST",
            headers: Session.Headers,
            body: formData.toString(),
        });
        return await req.text() === "true";
    }
    async showMessage(uuid) {
        const formData = new URLSearchParams();
        formData.append("a", "recycleMsg");
        formData.append("uniqid", uuid);
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php", {
            method: "POST",
            headers: Session.Headers,
            body: formData.toString(),
        });
        return await req.text() === "true";
    }
    async searchReceiver(query) {
        if (query.length < 2)
            throw new SPHError(ErrorCode.MinLengthForQuery);
        const formData = new URLSearchParams();
        formData.append("q", query);
        formData.append("page", "1");
        formData.append("a", "searchRecipt");
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php?"
            + formData.toString());
        return (await req.json()).items.map((i) => {
            const roleRaw = i.logo.replace("fa fa-", "");
            return {
                name: i.text,
                id: i.id,
                role: (roleRaw === "users" || roleRaw === "child") ? "student" : (roleRaw === "user-circle" ? "parent" : (roleRaw === "user" ? "teacher" : undefined))
            };
        });
    }
    async createNewChat(receivers, subject, content, type = undefined) {
        const messageData = [];
        receivers.forEach(receiver => {
            messageData.push({ name: "to[]", value: receiver });
        });
        messageData.push({ name: "subject", value: subject });
        messageData.push({ name: "text", value: content });
        if (type !== undefined) {
            /*
            * noAnswerAllowed: Keine Antworten möglich
            * privateAnswerOnly: Antworten nur an Absender möglich
            * groupOnly: Antworten immer an alle
            * openChat: Antworten an alle oder eine einzelne Person (auswählbar)
            */
            messageData.push({ name: "Art", value: type });
        }
        const formData = new URLSearchParams();
        formData.append("a", "newmessage");
        formData.append("c", await this.session.crypto.encryptAES(JSON.stringify(messageData), this.session.sessionKey));
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php", {
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
    async replyToChat(uuid, content, receiver = "all") {
        const formData = new URLSearchParams();
        formData.append("a", "reply");
        formData.append("c", await this.session.crypto.encryptAES(JSON.stringify({
            to: receiver, // Muss genauer erproben wie sich das in der Nachricht wiederspiegelt
            message: content,
            replyToMsg: uuid,
        }), this.session.sessionKey));
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php", {
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
    #parseAdditionalReceivers(raw) {
        if (raw === null || raw === undefined)
            return undefined;
        return raw.split("</span>").map((r) => this.#parseReceiver(r)).filter((r) => r !== undefined && r.name !== "");
    }
    #parseReceiver(r) {
        if (r === undefined || r === null || r === "") {
            return undefined;
        }
        r = r.replace("</span>", "");
        const roleRaw = r.split("class=\"fas fa-")[1].split("\"></i>")[0];
        return {
            name: r.split("</i> ")[1].trim(),
            role: (roleRaw === "users" || roleRaw === "child") ? "student" : (roleRaw === "user-circle" ? "parent" : (roleRaw === "user" ? "teacher" : undefined))
        };
    }
    #parseMessage(msg) {
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
            replies: msg.reply.map((reply) => this.#parseMessage(reply)),
        };
    }
}
