const crypto = require('crypto')
const CryptoJS = require("crypto-js");

const axios = require('axios');
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');
const fs = require("fs");
const cookieJar = new tough.CookieJar();
const client = axiosCookieJarSupport.wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

const JSSoup = require('jssoup').default;

if (process.env.debug)
    require('log-that-http')

const headers = {
    "User-Agent": 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "upgrade-insecure-requests": 1,
    "origin": "https://start.schulportal.hessen.de",
    "referer": "https://start.schulportal.hessen.de/index.php?i=6079"
}

class SessionManager {
    #generateUuid() {
        var d, r, uuid;
        d = Number.parseInt(process.hrtime.bigint());
        uuid = "";
        for (var c, _pj_c = 0, _pj_a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxx3xx", _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            c = _pj_a[_pj_c];
            r = (((d + (Number.parseInt((Math.random() * 16)))) % 16) | 0);
            d = Math.floor((d / 16));
            if ((c === "x")) {
                uuid = (uuid + (r).toString(16));
            } else {
                if ((c === "y")) {
                    uuid = (uuid + (((r & 3) | 8)).toString(16));
                } else {
                    uuid = (uuid + c);
                }
            }
        }
        return uuid;
    }

    async login(config) {
        var uuid = this.#generateUuid().toString("utf-8")
        if (process.env.debug) console.log("UUID: " + uuid)

        var sessionKey = this.#encrypt(uuid, uuid)
        if (process.env.debug) console.log("sessionKey: " + sessionKey)

        var ikeyRaw = (await client.get("https://start.schulportal.hessen.de/?i=6079")).data;
        var soup = new JSSoup(ikeyRaw);
        var ikey = soup.findAll("input").find(i => i.attrs.name === "ikey").attrs.value;
        if (process.env.debug) console.log("ikey: " + ikey)

        var publicKey = (await client.get("https://start.schulportal.hessen.de/ajax.php?f=rsaPublicKey")).data.publickey;
        if (process.env.debug) console.log("publicKey: " + publicKey)

        var encSessionKey = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.ENGINE_METHOD_RSA
            },
            Buffer.from(sessionKey)
        ).toString("base64");

        if (process.env.debug) console.log("encSessionKey: " + encSessionKey)

        var handshake = await client.post("https://start.schulportal.hessen.de/ajax.php?f=rsaHandshake&s=" + Math.floor(Math.random() * (1999 + 1)), "key=" + encodeURIComponent(encSessionKey), {
            headers: headers
        })
        if (process.env.debug) console.log("Challenge successful: " + ((this.#decrypt(handshake.data.challenge, sessionKey)) === sessionKey))

        var sid = (await cookieJar.getCookies("https://start.schulportal.hessen.de")).find(cookie => cookie.key === "sid").value;
        if (process.env.debug) console.log("sid: " + sid)

        var ajaxLogin = await client.post("https://start.schulportal.hessen.de/ajax_login.php", "name=" + sid, {
            headers: headers
        })
        if (process.env.debug) console.log("User-less login status: " + ajaxLogin.status)

        var ajaxUserLogin = await client.post("https://start.schulportal.hessen.de/ajax.php", "crypt=" + encodeURIComponent(this.#encrypt(`f=alllogin&art=all&sid=&ikey=${ikey}&user=${config.name}&passw=${config.password}`, sessionKey)), {
            headers: headers
        })
        console.log("Logged in as: " + ajaxUserLogin.data.name)
    }

    async fetchDelegationTable() {
        var vertretungsplan = await client.get("https://start.schulportal.hessen.de/vertretungsplan.php", {
            headers: headers
        })

        fs.writeFile('./Delegation-Table.html', vertretungsplan.data, err => {
            if (err) {
                console.error(err);
            }
        });

        console.log("Delegation table saved")
    }

    // Taken from https://github.com/HazAT/jCryption/blob/master/jquery.jcryption.3.1.0.js

    #encrypt(data, secret) {
        return CryptoJS.AES.encrypt(data, secret) + "";
    }

    #decrypt(data, secret) {
        return this.#hex2string(CryptoJS.AES.decrypt(data, secret) + "");
    };

    #hex2string(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    };
}

module.exports = SessionManager;