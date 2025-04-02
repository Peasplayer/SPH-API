export default class CacheEntry {
    value: any;
    createdAt: number;
    expiresIn: number;

    constructor(value: any, expiresIn: number = 15 * 1000 * 60) {
        this.value = value;
        this.createdAt = Date.now();
        this.expiresIn = expiresIn;
    }

    isValid(): boolean {
        return this.createdAt + this.expiresIn <= Date.now();
    }
}