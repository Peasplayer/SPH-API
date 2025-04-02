export default class CacheEntry {
    value;
    createdAt;
    expiresIn;
    constructor(value, expiresIn = 15 * 1000 * 60) {
        this.value = value;
        this.createdAt = Date.now();
        this.expiresIn = expiresIn;
    }
    isValid() {
        return this.createdAt + this.expiresIn <= Date.now();
    }
}
