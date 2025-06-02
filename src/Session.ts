import CacheEntry from "./lib/CacheEntry.js";
import Schedule from "./Schedule.js";
import SubstitutionPlan from "./SubstitutionPlan.js";
import Messages from "./Messages.js";
import MyLessons from "./MyLessons.js";
import SPHError, {ErrorCode} from "./lib/SPHError.js";
import HTMLParser from "node-html-parser";

export interface CryptoModule {
    randomUUID(): string;
    encryptAES(value: string, key: string): Promise<string>;
    decryptAES(value: string, key: string): Promise<string>;
    encryptRSA(value: string, publicKey: string): Promise<string>;
}

export interface ResponseObject {
    text(): Promise<string>;
    json(): Promise<any>;
    blob(): Promise<Blob>;
}

export interface FetchWrapperModule {
    fetch(url: string, options?: any): Promise<ResponseObject>;
    getCookie(domain: string, name: string): Promise<{key: string, value: string}>;
    clearCookies(): Promise<void>;
}

export interface Credentials {
    schoolId: string;
    username: string;
    password: string;
}

export default class Session {
    crypto: CryptoModule;
    fetchWrapper: FetchWrapperModule;
    sessionKey: string;
    sessionId: string;
    credentials: Credentials;

    #keepAliveCallback: number;

    Schedule: Schedule;
    SubstitutionPlan: SubstitutionPlan;
    Messages: Messages;
    MyLessons: MyLessons;

    constructor(crypto: CryptoModule, fetchWrapper: FetchWrapperModule) {
        this.crypto = crypto;
        this.fetchWrapper = fetchWrapper;

        this.Schedule = new Schedule(this);
        this.SubstitutionPlan = new SubstitutionPlan(this);
        this.Messages = new Messages(this);
        this.MyLessons = new MyLessons(this);
    }

    async login(credentials: Credentials) {
        if (credentials === undefined || credentials.username === undefined || credentials.schoolId === undefined || credentials.password === undefined)
            throw new SPHError(ErrorCode.CredentialsNotComplete)
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
            throw new SPHError(ErrorCode.SPHRejected, (await this.fetchLanguage()).data["PE" + login.error]);

        const connectReq = await this.fetchWrapper.fetch("https://connect.schulportal.hessen.de", { headers: Session.Headers });
        const connectRes = await connectReq.text();
        if (connectRes.startsWith("{")) {
            const connectJson = JSON.parse(connectRes);
            if (connectJson.result !== 1)
                throw new SPHError(ErrorCode.SPHRejected, (await this.fetchLanguage()).data["PE" + connectJson.error]);
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
            throw new SPHError(ErrorCode.FailedHandshake);
    }

    async fetchAlerts(): Promise<{
        "myLessons": { alerts: string; texts: string[] }|undefined;
        "schedule": { alerts: string; texts: string[] }|undefined;
        "messages": { alerts: string; texts: string[] }|undefined;
        "substitution": { alerts: string; texts: string[] }|undefined;
    }> {
        const request = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/startseite.php", {
            headers: Session.Headers,
            method: "POST",
            body: "a=ajax&f=previews",
        });

        const response = await request.json();

        function getAlert(id: string) {
            return response[id].show ? {
                alerts: response[id].preview.toString(),
                texts: response[id].preshow?.map((t: string) => HTMLParser.parse(t).textContent.trim()),
            } : undefined
        }

        return {
            "myLessons": getAlert('t59-1'),
            "schedule": getAlert('t61-1'),
            "messages": getAlert('t54-1'),
            "substitution": getAlert('t17-1'),
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
        console.log(await test.json())
        //console.log(await (await fetch("https://start.schulportal.hessen.de/startseite.php?a=ajax&f=previews", { headers: Session.Headers, method: "POST" })).text())
        return await request.json();
    }

    async fetchRemainingSessionTime() {
        const request = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/ajax_login.php", {
            "headers": Session.Headers,
            "body": "name=" + this.sessionId,
            "method": "POST",
        });

        const time = parseInt(await request.text());
        if (isNaN(time))
            throw new SPHError(ErrorCode.NotANumber);

        return time;
    }

    async keepSessionAlive() {
        const data = await this.fetchRemainingSessionTime();
        if (data <= 0 || data === 300)
            throw new SPHError(ErrorCode.SessionHasEnded);

        this.#keepAliveCallback = setTimeout(() => this.keepSessionAlive(), data * 1000);
        return true;
    }

    static Headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
    }

    #cache: {language?: CacheEntry, schoolList?: CacheEntry, schoolData: any} = { language: undefined, schoolList: undefined, schoolData: {} };

    async fetchLanguage() {
        if (this.#cache.language === undefined || !this.#cache.language.isValid()) {
            const request = await this.fetchWrapper.fetch("https://login.schulportal.hessen.de/static/languages/de.json");
            this.#cache.language = new CacheEntry(await request.json())
        }

        return this.#cache.language.value;
    }

    async fetchSchoolList() {
        if (this.#cache.schoolList === undefined || !this.#cache.schoolList.isValid()) {
            const request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist");
            this.#cache.schoolList = new CacheEntry(await request.json())
        }

        return this.#cache.schoolList.value;
    }

    async fetchSchoolData(id: string) {
        if (this.#cache.schoolData[id] === undefined || !this.#cache.schoolData[id].isValid()) {
            const request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist");
            this.#cache.schoolData[id] = new CacheEntry(await request.json())
        }

        return this.#cache.schoolData[id].value;
    }
}