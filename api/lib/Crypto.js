import CryptoJS from 'crypto-js';
import JSEncrypt from 'node-jsencrypt';

export default class Crypto {
    static randomUUID() {
        var d, r, uuid;
        d = Number.parseInt("16160449445400");
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

    static encryptAES(value, key) {
        return CryptoJS.AES.encrypt(value, key).toString();
    }
    static decryptAES(value, key) {
        return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);
    }

    static encryptRSA(value, publicKey) {
        let rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPublicKey(publicKey);
        return rsaEncrypt.encrypt(value);
    }
    static decryptRSA(value, privateKey) {
        let rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPrivateKey(privateKey);
        return rsaEncrypt.decrypt(value);
    }
}