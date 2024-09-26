import fetchCookie from 'fetch-cookie';
import nodeFetch from 'node-fetch';

// Used to make the API compatible with multiple clients
export default class DefaultFetchWrapper {
    constructor() {
        // Fields for only this implementation
        this._cookieJar = new fetchCookie.toughCookie.CookieJar();
        this._fetch = fetchCookie(nodeFetch, this._cookieJar);
    }

    async fetch(url, options) {
        return new ResponseObject(await this._fetch(url, options));
    }

    async getCookie(domain, name) {
        var cookies = await this._cookieJar.getCookies("https://" + domain);
        return cookies.find(cookie => cookie.key === name);
    }
}

export class ResponseObject {
    defaultObject;

    constructor(defaultObject) {
        this.defaultObject = defaultObject;
    }

    async text() {
        return this.defaultObject.text();
    }

    async json() {
        return this.defaultObject.json();
    }
}