export default class ReturnObject {
    data: any;
    code: number;
    success: boolean;
    constructor(data?: any, code?: number);
    static NoData: ReturnObject;
    static Error(errorObject: Error): ReturnObject;
}
