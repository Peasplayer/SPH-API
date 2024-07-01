import Crypto from "./lib/Crypto.js";
import nodeFetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';
import HTMLParser from "fast-html-parser";
import CacheEntry from "./lib/CacheEntry.js";

const fetch = fetchCookie(nodeFetch)

export default class Session {
    sessionKey;
    credentials;

    constructor() {
        this.sessionKey = Crypto.encryptAES(Crypto.randomUUID(), Crypto.randomUUID());
    }

    async login(credentials) {
        if (credentials === undefined || credentials.username === undefined || credentials.schoolId === undefined || credentials.password === undefined)
            return { success: false, text: "Credentials not complete" };
        this.credentials = credentials;

        /*var test0 = await fetch("https://start.schulportal.hessen.de/ajax_login.php", {
            "method": "POST",
            "headers": headers,
            "body": "name=test",
            "redirect": "follow"
        });
        console.log(await test0.text())*/

        var loginReq = await fetch("https://login.schulportal.hessen.de/?i=" + credentials.schoolId, {
            "method": "POST",
            "body": encodeURI(`url=&timezone=2&skin=sp&user2=${credentials.username}&user=${credentials.schoolId}.${credentials.username}&password=${credentials.password + ""}`),
            "headers": Session.Headers,
            "redirect": "follow"
        });
        var login = await loginReq.json();
        if (login.result !== 1)
            return { success: false, text: (await Session.fetchLanguage())["PE" + login.error] };

        var connectReq = await fetch("https://connect.schulportal.hessen.de", { headers: Session.Headers });
        var connectRes = await connectReq.text();
        if (connectRes.startsWith("{") && JSON.parse(connectRes).result !== 1) {
            return { success: false, text: (await Session.fetchLanguage())["PE" + login.error] };
        }

        var publicKey = (await (await fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaPublicKey")).json()).publickey;
        var handshakeReq = await fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaHandshake&s=" + Math.floor(Math.random() * 2000), {
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
        var request = await fetch("https://start.schulportal.hessen.de/startseite.php?a=ajax&f=apps", { headers: Session.Headers });
        var test = await fetch("https://start.schulportal.hessen.de/startseite.php", {
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

    async test() {
        var req = await fetch("https://start.schulportal.hessen.de/stundenplan.php?a=detail_klasse&e=1&k=11BGd", { headers: Session.Headers });
        var parsed = HTMLParser.parse(await req.text());
        parsed.removeWhitespace();
        var rows = parsed.querySelector("#all").querySelector("tbody").childNodes;
        rows.shift();
        //console.log(rows[0].childNodes)
        console.log(rows.map(row => {
            var columns = row.childNodes;
            columns.shift();
            return {
                hour: rows.indexOf(row) + 1,
                subjects: columns.map(column => column.childNodes.filter(subject => subject.classNames.includes("stunde"))
                    .map(subject => {
                        var rawData = subject.attributes.title.trim().replace(" im Raum ", ";;;")
                            .replace(" bei der Klasse/Stufe/Lerngruppe ", ";;;");
                        var data = rawData.split(";;;");
                        return { id: subject.attributes['data-mix'], subject: data[0], room: data[1], group: data[2],
                            teacher: subject.querySelector("small").text, rawTitle: subject.attributes.title, span: column.attributes.rowspan };
                    }))
            };
        })[0].subjects[4]);
    }

    static Headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        //"Host": "login.schulportal.hessen.de",
        //"Connection": "close",
        "X-Requested-With": "XMLHttpRequest",
        //"Referer": "https://login.schulportal.hessen.de/?i=" + credentials.schoolId,
        //"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
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