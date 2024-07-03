import nodeFetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';
import HTMLParser from "fast-html-parser";
import * as fs from "node:fs";

import Crypto from "./lib/Crypto.js";
import CacheEntry from "./lib/CacheEntry.js";
import Schedule from "./Schedule.js";

const fetch = fetchCookie(nodeFetch);

export default class Session {
    fetch;
    cookieJar;
    sessionKey;
    sessionId;
    credentials;

    _keepAliveCallback;

    Schedule;

    constructor() {
        this.cookieJar = new fetchCookie.toughCookie.CookieJar();
        this.fetch = fetchCookie(nodeFetch, this.cookieJar);
        this.sessionKey = Crypto.encryptAES(Crypto.randomUUID(), Crypto.randomUUID());

        this.Schedule = new Schedule(this);
    }

    async login(credentials) {
        if (credentials === undefined || credentials.username === undefined || credentials.schoolId === undefined || credentials.password === undefined)
            return { success: false, text: "Credentials not complete" };
        this.credentials = credentials;

        var loginReq = await this.fetch("https://login.schulportal.hessen.de/?i=" + credentials.schoolId, {
            "method": "POST",
            "body": encodeURI(`url=&timezone=2&skin=sp&user2=${credentials.username}&user=${credentials.schoolId}.${credentials.username}&password=${credentials.password + ""}`),
            "headers": Session.Headers,
            "redirect": "follow"
        });
        var login = await loginReq.json();
        if (login.result !== 1)
            return { success: false, text: (await Session.fetchLanguage())["PE" + login.error] };

        var connectReq = await this.fetch("https://connect.schulportal.hessen.de", { headers: Session.Headers });
        var connectRes = await connectReq.text();
        if (connectRes.startsWith("{") && JSON.parse(connectRes).result !== 1) {
            return { success: false, text: (await Session.fetchLanguage())["PE" + login.error] };
        }

        this.sessionId = (await this.cookieJar.getCookies("https://schulportal.hessen.de")).find(cookie => cookie.key === "sid").value;
        this.keepSessionAlive();

        var publicKey = (await (await this.fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaPublicKey")).json()).publickey;
        var handshakeReq = await this.fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaHandshake&s=" + Math.floor(Math.random() * 2000), {
            "method": "POST",
            "body": "key=" + encodeURIComponent(Crypto.encryptRSA(this.sessionKey, publicKey)),
            "headers": Session.Headers
        });
        var decryptedChallenge = Crypto.decryptAES((await handshakeReq.json()).challenge, this.sessionKey);
        if (decryptedChallenge !== this.sessionKey)
            return { success: false, text: "Handshake ist fehlgeschlagen" };

        return { success: true, text: (await Session.fetchLanguage())["PE" + login.error] };
    }

    async fetchApps() {
        var request = await this.fetch("https://start.schulportal.hessen.de/startseite.php?a=ajax&f=apps", { headers: Session.Headers });
        var test = await this.fetch("https://start.schulportal.hessen.de/startseite.php", {
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
        var request = await this.fetch("https://start.schulportal.hessen.de/ajax_login.php", {
            "headers": Session.Headers,
            "body": "name=" + this.sessionId,
            "method": "POST",
        });

        return await request.text();
    }

    async keepSessionAlive() {
        var data = await this.fetchRemainingSessionTime();
        if (data === undefined || data === "" || data <= 0 || data === 300)
            return;

        this._keepAliveCallback = setTimeout(() => this.keepSessionAlive(), data * 1000);
    }

    static Headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
    }
    static _cache = { language: undefined, schoolList: undefined, schoolData: {} };

    static async fetchLanguage() {
        if (this._cache.language !== undefined)
            return this._cache.language;

        var request = await fetch("https://login.schulportal.hessen.de/static/languages/de.json");
        return this._cache.language = await request.json();
    }

    static async fetchSchoolList() {
        if (this._cache.schoolList !== undefined && this._cache.schoolList.isValid())
            return this._cache.schoolList.value;

        var request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=schoollist");
        return this._cache.schoolList = new CacheEntry(await request.json());
    }

    static async fetchSchoolData(id) {
        if (this._cache.schoolData[id] !== undefined && this._cache.schoolData[id].isValid())
            return this._cache.schoolData[id].value;

        var request = await fetch("https://startcache.schulportal.hessen.de/exporteur.php?a=school&i=" + id);
        return this._cache.schoolData[id] = new CacheEntry(await request.json());
    }
}