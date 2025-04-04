var ReturnCode;
(function (ReturnCode) {
    ReturnCode[ReturnCode["RuntimeError"] = -1] = "RuntimeError";
    ReturnCode[ReturnCode["Success"] = 0] = "Success";
    ReturnCode[ReturnCode["NoData"] = 1] = "NoData";
    ReturnCode[ReturnCode["CredentialsNotComplete"] = 2] = "CredentialsNotComplete";
    ReturnCode[ReturnCode["SPHRejectedLogin"] = 3] = "SPHRejectedLogin";
    ReturnCode[ReturnCode["FailedHandshake"] = 4] = "FailedHandshake";
    ReturnCode[ReturnCode["NotANumber"] = 5] = "NotANumber";
    ReturnCode[ReturnCode["SessionHasEnded"] = 6] = "SessionHasEnded";
    ReturnCode[ReturnCode["MinLengthForQuery"] = 7] = "MinLengthForQuery";
})(ReturnCode || (ReturnCode = {}));
export default class ReturnObject {
    data;
    code;
    success;
    constructor(data = undefined, code = ReturnCode.Success) {
        this.data = data;
        this.code = code;
        this.success = code === 0;
        // @ts-ignore
        Error.captureStackTrace(this);
    }
    static NoData = new ReturnObject(undefined, ReturnCode.NoData);
    static Error(errorObject) {
        return new ReturnObject(errorObject, ReturnCode.RuntimeError);
    }
}
