import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
import Utils from "./Utils.js";

export default class Messages {
    session;

    constructor(session) {
        this.session = session;
    }

    async fetchChats(visibleOnly = true) {
        try {
            const formData = new FormData();
            formData.append("a", "headers");
            formData.append("getType", visibleOnly ? "visibleOnly": "unvisibleOnly");
            formData.append("last", "0");

            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
                {
                    method: "POST",
                    headers: Session.Headers,
                    body: new URLSearchParams(formData).toString(),
                });

            const data = await req.json();

            return new ReturnObject(true, 0, JSON.parse(this.session.crypto.decryptAES(data.rows, this.session.sessionKey)).map(row => {
                return {
                    id: row.Id,
                    uuid: row.Uniquid,
                    sender: row.Sender,
                    subject: row.Betreff,
                    deleted: row.Papierkorb,
                    private: row.private,
                    receiver: row.empf === "" ? undefined : this.#parseAdditionalReceivers(row.empf.join()),
                    additionalReceiver: this.#parseAdditionalReceivers(row.WeitereEmpfaenger),
                    initials: row.kuerzel,
                    date: row.DatumUnix * 1000
                }
            }));
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    async fetchChatMessages(uuid) {
        try {
            const formData = new FormData();
            formData.append("a", "read");
            formData.append("uniqid", this.session.crypto.encryptAES(uuid, this.session.sessionKey));

            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
                {
                    method: "POST",
                    headers: Session.Headers,
                    body: new URLSearchParams(formData).toString(),
                });

            const data = await req.json();

            return new ReturnObject(true, 0, {
                date: data.time * 1000,
                options: {
                    groupOnly: data.groupOnly === "ja",
                    privateAnswerOnly: data.privateAnswerOnly === "ja",
                    noAnswerAllowed: data.noAnswerAllowed === "ja",
                },
                self: {
                    id: data.userId,
                    role: data.UserTyp === "Teilnehmer" ? "student" : (data.UserTyp === "Betreuer" ? "teacher" : (data.UserTyp === "Eltern" ? "parent" : undefined))
                },
                initialMessage: this.#parseMessage(JSON.parse(this.session.crypto.decryptAES(data.message, this.session.sessionKey)))
            });
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    async hideMessage(uuid) {
        try {
            const formData = new FormData();
            formData.append("a", "deleteAll");
            formData.append("uniqid", uuid);

            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
                {
                    method: "POST",
                    headers: Session.Headers,
                    body: new URLSearchParams(formData).toString(),
                });

            const data = await req.text();

            return new ReturnObject(data === "true", 0, undefined);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    async showMessage(uuid) {
        try {
            const formData = new FormData();
            formData.append("a", "recycleMsg");
            formData.append("uniqid", uuid);

            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
                {
                    method: "POST",
                    headers: Session.Headers,
                    body: new URLSearchParams(formData).toString(),
                });

            const data = await req.text();

            return new ReturnObject(data === "true", 0, undefined);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    async searchReceiver(query) {
        if (query.length < 2)
            return new ReturnObject(false, 7, undefined);

        try {
            const formData = new FormData();
            formData.append("q", query);
            formData.append("page", 1);
            formData.append("a", "searchRecipt");

            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php?"
                + new URLSearchParams(formData).toString());

            const data = await req.json();

            return new ReturnObject(true, 0, data);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    async createNewChat(receivers, subject, content, type = undefined) {
        try {
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
                * openChat: "auch privates Kommunizieren unter Einzelnen möglich" (Keine Ahnung wie das funktioniert)
                */
                messageData.push({name: "Art", value: type});
            }

            const formData = new FormData();
            formData.append("a", "newmessage");
            formData.append("c", this.session.crypto.encryptAES(JSON.stringify(messageData), this.session.sessionKey));

            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
                {
                    method: "POST",
                    headers: Session.Headers,
                    body: new URLSearchParams(formData).toString(),
                });

            const data = await req.json();

            return new ReturnObject(data.back, 0, data.id);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    async replyToChat(uuid, content){
        try {
            const formData = new FormData();
            formData.append("a", "reply");
            formData.append("c", this.session.crypto.encryptAES(JSON.stringify({
                to: "all",
                message: content,
                replyToMsg: uuid,
            }), this.session.sessionKey));

            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/nachrichten.php",
                {
                    method: "POST",
                    headers: Session.Headers,
                    body: new URLSearchParams(formData).toString(),
                });

            const data = await req.json();

            return new ReturnObject(data.back, 0, data.id);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    #parseAdditionalReceivers(raw) {
        if (raw === null || raw === undefined)
            return undefined;

        return raw.split("</span>").map(r => {
            if (r === "")
                return undefined;

            const roleRaw = r.split("class=\"fas fa-")[1].split("\"></i>")[0];
            return {
                name: r.split("</i> ")[1].trim(),
                role: roleRaw === "users" || "child" ? "student" : (roleRaw === "user-circle" ? "parent" : (roleRaw === "user" ? "teacher" : undefined))
            }
        }).filter(r => r !== undefined);
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
            },
            subject: msg.Betreff,
            date: Utils.parseStringDate(msg.Datum),
            content: decodeURIComponent(msg.Inhalt.replaceAll("<br />", "")),
            receivers: msg.empf === "" ? undefined : this.#parseAdditionalReceivers(msg.empf.join()),
            additionalReceivers: this.#parseAdditionalReceivers(msg.WeitereEmpfaenger),
            users: {
                students: msg.statistik.teilnehmer,
                teachers: msg.statistik.betreuer,
                parents: msg.statistik.eltern
            },
            ownMessage: msg.own,
            markedAsDeleted: msg.Deleted,
            replies: msg.reply.map(reply => this.#parseMessage(reply)),
        }
    }
}