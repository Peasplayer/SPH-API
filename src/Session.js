import CacheEntry from "./lib/CacheEntry.js";
import Schedule from "./Schedule.js";
import ReturnObject from "./lib/ReturnObject.js";
import SubstitutionPlan from "./SubstitutionPlan.js";

export default class Session {
    crypto;
    fetchWrapper;
    sessionKey;
    sessionId;
    credentials;

    _keepAliveCallback;

    Schedule;
    SubstitutionPlan;

    constructor(crypto, fetchWrapper) {
        this.crypto = crypto;
        this.fetchWrapper = fetchWrapper;
        this.sessionKey = this.crypto.encryptAES(this.crypto.randomUUID(), this.crypto.randomUUID());

        this.Schedule = new Schedule(this);
        this.SubstitutionPlan = new SubstitutionPlan(this);
    }

    async login(credentials) {
        try {
            if (credentials === undefined || credentials.username === undefined || credentials.schoolId === undefined || credentials.password === undefined)
                return new ReturnObject(false, 1);
            this.credentials = credentials;

            await this.fetchWrapper.clearCookies();

            var loginReq = await this.fetchWrapper.fetch("https://login.schulportal.hessen.de/?i=" + credentials.schoolId, {
                "method": "POST",
                "body": encodeURI(`url=&timezone=2&skin=sp&user2=${credentials.username}&user=${credentials.schoolId}.${credentials.username}&password=${credentials.password + ""}`),
                "headers": Session.Headers,
                "redirect": "follow"
            });
            var login = await loginReq.json();
            if (login.result !== 1)
                return new ReturnObject(false, 2, (await Session.fetchLanguage()).data["PE" + login.error]);

            var connectReq = await this.fetchWrapper.fetch("https://connect.schulportal.hessen.de", { headers: Session.Headers });
            var connectRes = await connectReq.text();
            if (connectRes.startsWith("{")) {
                var connectJson = JSON.parse(connectRes);
                if (connectJson.result !== 1)
                    return new ReturnObject(false, 2, (await Session.fetchLanguage(this.fetchWrapper.fetch))
                        .data["PE" + connectJson.error]);
            }

            this.sessionId = (await this.fetchWrapper.getCookie("schulportal.hessen.de", "sid")).value;
            await this.keepSessionAlive();

            var publicKey = (await (await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaPublicKey")).json()).publickey;
            var handshakeReq = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaHandshake&s=" + Math.floor(Math.random() * 2000), {
                "method": "POST",
                "body": "key=" + encodeURIComponent(this.crypto.encryptRSA(this.sessionKey, publicKey)),
                "headers": Session.Headers
            });
            var decryptedChallenge = this.crypto.decryptAES((await handshakeReq.json()).challenge, this.sessionKey);
            if (decryptedChallenge !== this.sessionKey)
                return new ReturnObject(false, 3);

            return new ReturnObject(true, 0);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    // NOT USE
    async fetchApps() {
        var request = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/startseite.php?a=ajax&f=apps", { headers: Session.Headers });
        var test = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/startseite.php", {
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
        try {
            var request = await this.fetchWrapper.fetch("https://start.schulportal.hessen.de/ajax_login.php", {
                "headers": Session.Headers,
                "body": "name=" + this.sessionId,
                "method": "POST",
            });

            var time = parseInt(await request.text());
            if (isNaN(time))
                return new ReturnObject(false, 4);

            return new ReturnObject(true, 0, time);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    async keepSessionAlive() {
        try {
            var data = await this.fetchRemainingSessionTime();
            if (!data.success || data.data === undefined || data.data === "" || data.data <= 0 || data.data === 300)
                return new ReturnObject(false, 5, data.data);

            this._keepAliveCallback = setTimeout(() => this.keepSessionAlive(), data.data * 1000);
            return new ReturnObject(true, 0);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    static Headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
    }
    static _cache = { language: undefined, schoolList: undefined, schoolData: {} };

    static async fetchLanguage() {
        try {
            if (this._cache.language === undefined || !this._cache.language.isValid()) {
                var request = await fetch("https://login.schulportal.hessen.de/static/languages/de.json");
                this._cache.language = new CacheEntry(await request.json())
            }

            return new ReturnObject(true, 0, this._cache.language.value);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    static async fetchSchoolList() {
        try {
            if (this._cache.schoolList === undefined || !this._cache.schoolList.isValid()) {
                var request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist");
                this._cache.schoolList = new CacheEntry(await request.json())
            }

            return new ReturnObject(true, 0, this._cache.schoolList.value);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    static async fetchSchoolData(id) {
        try {
            if (this._cache.schoolData[id] === undefined || !this._cache.schoolData[id].isValid()) {
                var request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist");
                this._cache.schoolData[id] = new CacheEntry(await request.json())
            }

            return new ReturnObject(true, 0, this._cache.schoolData[id].value);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }
}