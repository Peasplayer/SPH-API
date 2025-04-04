declare enum ReturnCode {
    RuntimeError = -1,
    Success = 0,
    NoData = 1,
    CredentialsNotComplete = 2,
    SPHRejectedLogin = 3,
    FailedHandshake = 4,
    NotANumber = 5,
    SessionHasEnded = 6,
    MinLengthForQuery = 7
}
export default class ReturnObject<T> {
    data?: T;
    code: ReturnCode;
    success: boolean;
    constructor(data?: T | undefined, code?: ReturnCode);
    static NoData: ReturnObject<undefined>;
    static Error(errorObject: Error): ReturnObject<Error>;
}
export {};
