import Schedule from "./Schedule.js";
import ReturnObject from "./lib/ReturnObject.js";
import SubstitutionPlan from "./SubstitutionPlan.js";
import Messages from "./Messages.js";
import MyLessons from "./MyLessons.js";
interface CryptoModule {
    randomUUID(): string;
    encryptAES(value: string, key: string): Promise<string>;
    decryptAES(value: string, key: string): Promise<string>;
    encryptRSA(value: string, publicKey: string): Promise<string>;
}
interface ResponseObject {
    text(): Promise<string>;
    json(): Promise<any>;
}
interface FetchWrapperModule {
    fetch(url: string, options?: any): Promise<ResponseObject>;
    getCookie(domain: string, name: string): Promise<{
        key: string;
        value: string;
    }>;
    clearCookies(): Promise<void>;
}
interface Credentials {
    schoolId: string;
    username: string;
    password: string;
}
export default class Session {
    #private;
    crypto: CryptoModule;
    fetchWrapper: FetchWrapperModule;
    sessionKey: string;
    sessionId: string;
    credentials: Credentials;
    Schedule: Schedule;
    SubstitutionPlan: SubstitutionPlan;
    Messages: Messages;
    MyLessons: MyLessons;
    constructor(crypto: CryptoModule, fetchWrapper: FetchWrapperModule);
    login(credentials: Credentials): Promise<ReturnObject<any>>;
    fetchApps(): Promise<any>;
    fetchRemainingSessionTime(): Promise<ReturnObject<undefined> | ReturnObject<Error> | ReturnObject<number>>;
    keepSessionAlive(): Promise<ReturnObject<number | Error> | ReturnObject<boolean>>;
    static Headers: {
        Accept: string;
        "Content-Type": string;
        "X-Requested-With": string;
    };
    fetchLanguage(): Promise<ReturnObject<any>>;
    fetchSchoolList(): Promise<ReturnObject<any>>;
    fetchSchoolData(id: string): Promise<ReturnObject<any>>;
}
export {};
