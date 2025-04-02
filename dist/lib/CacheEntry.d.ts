export default class CacheEntry {
    value: any;
    createdAt: number;
    expiresIn: number;
    constructor(value: any, expiresIn?: number);
    isValid(): boolean;
}
