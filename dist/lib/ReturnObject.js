export default class ReturnObject {
    data;
    code;
    success;
    constructor(data = undefined, code = 0) {
        this.data = data;
        this.code = code;
        this.success = code === 0;
        // @ts-ignore
        Error.captureStackTrace(this);
    }
    static NoData = new ReturnObject(undefined, 1);
    static Error(errorObject) {
        return new ReturnObject(errorObject, -1);
    }
}
