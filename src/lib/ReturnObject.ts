enum ReturnCode {
    RuntimeError = -1,
    Success,
    NoData,
    CredentialsNotComplete,
    SPHRejectedLogin,
    FailedHandshake,
    NotANumber,
    SessionHasEnded,
    MinLengthForQuery
}

export default class ReturnObject<T> {
    data?: T;
    code;
    success;

    constructor(data: T|undefined = undefined, code: ReturnCode = ReturnCode.Success) {
        this.data = data;
        this.code = code;
        this.success = code === 0;

        // @ts-ignore
        Error.captureStackTrace(this);
    }

    static NoData = new ReturnObject(undefined, ReturnCode.NoData);

    static Error(errorObject: Error) {
        return new ReturnObject(errorObject, ReturnCode.RuntimeError);
    }
}