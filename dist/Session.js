import CacheEntry from "./lib/CacheEntry.js";
import Schedule from "./Schedule.js";
import ReturnObject from "./lib/ReturnObject.js";
import SubstitutionPlan from "./SubstitutionPlan.js";
import Messages from "./Messages.js";
import MyLessons from "./MyLessons.js";
export default class Session {
    crypto;
    fetchWrapper;
    sessionKey;
    sessionId;
    credentials;
    #keepAliveCallback;
    Schedule;
    SubstitutionPlan;
    Messages;
    MyLessons;
    constructor(crypto, fetchWrapper) {
        this.crypto = crypto;
        this.fetchWrapper = fetchWrapper;
        this.Schedule = new Schedule(this);
        this.SubstitutionPlan = new SubstitutionPlan(this);
        this.Messages = new Messages(this);
        this.MyLessons = new MyLessons(this);
    }
    async login(credentials) {
        try {
            if (credentials === undefined || credentials.username === undefined || credentials.schoolId === undefined || credentials.password === undefined)
                return new ReturnObject(undefined, 1);
            this.credentials = credentials;
            this.sessionKey = await this.crypto.encryptAES(this.crypto.randomUUID(), this.crypto.randomUUID());
            await this.fetchWrapper.clearCookies();
            const loginReq = await this.fetchWrapper.fetch("https://login.schulportal.hessen.de/?i=" + credentials.schoolId, {
                "method": "POST",
                "body": encodeURI(`url=&timezone=2&skin=sp&user2=${credentials.username}&user=${credentials.schoolId}.${credentials.username}&password=${credentials.password + ""}`),
                "headers": Session.Headers,
                "redirect": "follow"
            });
            const login = await loginReq.json();
            if (login.result !== 1)
                return new ReturnObject((await this.fetchLanguage()).data["PE" + login.error], 2);
            const connectReq = await this.fetchWrapper.fetch("https://connect.schulportal.hessen.de", { headers: Session.Headers });
            const connectRes = await connectReq.text();
            if (connectRes.startsWith("{")) {
                const connectJson = JSON.parse(connectRes);
                if (connectJson.result !== 1)
                    return new ReturnObject((await this.fetchLanguage())
                        .data["PE" + connectJson.error], 2);
            }
            this.sessionId = (await this.fetchWrapper.getCookie("schulportal.hessen.de", "sid")).value;
            await this.keepSessionAlive();
            const publicKey = (await (await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaPublicKey")).json()).publickey;
            const handshakeReq = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaHandshake&s=" + Math.floor(Math.random() * 2000), {
                "method": "POST",
                "body": "key=" + encodeURIComponent(await this.crypto.encryptRSA(this.sessionKey, publicKey)),
                "headers": Session.Headers
            });
            const decryptedChallenge = await this.crypto.decryptAES((await handshakeReq.json()).challenge, this.sessionKey);
            if (decryptedChallenge !== this.sessionKey)
                return new ReturnObject(undefined, 3);
            return new ReturnObject();
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
    // NOT USE
    async fetchApps() {
        const request = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/startseite.php?a=ajax&f=apps", { headers: Session.Headers });
        const test = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/startseite.php", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
                "Accept": "*/*",
                "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Sec-GPC": "1",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://start.schulportal.hessen.de/index.php",
            "body": "a=ajax&f=previews",
            "method": "POST",
            "mode": "cors"
        });
        console.log(await test.json());
        //console.log(await (await fetch("https://start.schulportal.hessen.de/startseite.php?a=ajax&f=previews", { headers: Session.Headers, method: "POST" })).text())
        return await request.json();
    }
    async fetchRemainingSessionTime() {
        try {
            const request = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/ajax_login.php", {
                "headers": Session.Headers,
                "body": "name=" + this.sessionId,
                "method": "POST",
            });
            const time = parseInt(await request.text());
            if (isNaN(time))
                return new ReturnObject(undefined, 4);
            return new ReturnObject(time);
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
    async keepSessionAlive() {
        try {
            const data = await this.fetchRemainingSessionTime();
            if (!data.success || data.data === undefined || data.data === "" || data.data <= 0 || data.data === 300)
                return new ReturnObject(data.data, 5);
            this.#keepAliveCallback = setTimeout(() => this.keepSessionAlive(), data.data * 1000);
            return new ReturnObject(true, 0);
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
    static Headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
    };
    #cache = { language: undefined, schoolList: undefined, schoolData: {} };
    async fetchLanguage() {
        try {
            if (this.#cache.language === undefined || !this.#cache.language.isValid()) {
                const request = await this.fetchWrapper.fetch("https://login.schulportal.hessen.de/static/languages/de.json");
                this.#cache.language = new CacheEntry(await request.json());
            }
            return new ReturnObject(this.#cache.language.value);
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
    async fetchSchoolList() {
        try {
            if (this.#cache.schoolList === undefined || !this.#cache.schoolList.isValid()) {
                const request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist");
                this.#cache.schoolList = new CacheEntry(await request.json());
            }
            return new ReturnObject(this.#cache.schoolList.value);
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
    async fetchSchoolData(id) {
        try {
            if (this.#cache.schoolData[id] === undefined || !this.#cache.schoolData[id].isValid()) {
                const request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist");
                this.#cache.schoolData[id] = new CacheEntry(await request.json());
            }
            return new ReturnObject(this.#cache.schoolData[id].value);
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
}
