const crypto = require('crypto')
var CryptoJS = require("crypto-js");
const fetch = require("node-fetch");
const JSSoup = require('jssoup').default;

const user = {name: "Vorname.Nachname", password: "Passwort"}

class CookieManager {
    generate_uuid() {
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

    async setup() {
        var uuid = this.generate_uuid().toString("utf-8")
        console.log("UUID: " + uuid)
        var sessionKey = this.encrypt(uuid, uuid)
        console.log("sessionKey: " + sessionKey)

        var ikeyRaw = await (await fetch("https://start.schulportal.hessen.de/?i=6079", {
            method: 'GET',
            headers: {
                "User-Agent": 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 ',
                "upgrade-insecure-requests": 1,
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })).text();
        var soup = new JSSoup(ikeyRaw);
        var ikey = soup.findAll("input").find(i => i.attrs.name === "ikey").attrs.value;
        console.log("ikey: " + ikey)

        var publicKey = (await (await fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaPublicKey")).json()).publickey;
        console.log("publicKey: " + publicKey)

        var encSessionKey = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.ENGINE_METHOD_RSA
            },
            Buffer.from(sessionKey)
        ).toString("base64");

        console.log("encSessionKey: " + encSessionKey)

        var handshake = await fetch("https://start.schulportal.hessen.de/ajax.php?f=rsaHandshake&s=" + Math.floor(Math.random() * (1999 + 1)), {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "origin": "https://start.schulportal.hessen.de",
                "referer": "https://start.schulportal.hessen.de/index.php?i=6079"
            },
            body: "key=" + encodeURIComponent(encSessionKey)
        })
        console.log("Decrypted challenge: " + (this.decrypt((await handshake.json()).challenge, sessionKey)))

        var sid = handshake.headers.get("set-cookie").split(";").find(cookie => cookie.includes("sid")).split("=")[1]
        console.log("sid: " + sid)
        var ajaxLogin = await fetch("https://start.schulportal.hessen.de/ajax_login.php", {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "origin": "https://start.schulportal.hessen.de",
                "referer": "https://start.schulportal.hessen.de/index.php?i=6079",
                "Cookie": "sid=" + sid + ";id=6079"
            },
            body: "name=" + sid
        })
        console.log(ajaxLogin.headers)

        var ajaxUserLogin = await fetch("https://start.schulportal.hessen.de/ajax_login.php", {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "origin": "https://start.schulportal.hessen.de",
                "referer": "https://start.schulportal.hessen.de/index.php",
                "Cookie": "sid=" + sid + ";id=6079"
            },
            body: "crypt=" + encodeURIComponent(this.encrypt(`f=alllogin&art=all&sid=${sid}&ikey=${ikey}&user=${user.name}&passw=${user.password}`, sessionKey))
        })

        var response = await ajaxUserLogin.text();

        console.log(response)

        var vertretungsplan = await fetch("https://start.schulportal.hessen.de/vertretungsplan.php", {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": "sid=" + sid + ";id=6079"
            }
        })

        response = await vertretungsplan.text();

        console.log(response)
    }

    encrypt(data, secret) {
        return CryptoJS.AES.encrypt(data, secret) + "";
    }

    decrypt(data, secret) {
        return this.hex2string(CryptoJS.AES.decrypt(data, secret) + "");
    };

    hex2string(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    };
}

module.exports = CookieManager;