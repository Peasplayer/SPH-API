export default class ReturnObject {
    constructor(success, code, data = undefined) {
        this.success = success;
        this.code = code;
        this.data = data;

        Error.captureStackTrace(this);
    }
}