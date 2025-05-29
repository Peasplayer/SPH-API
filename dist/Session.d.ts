import Schedule from "./Schedule.js";
import SubstitutionPlan from "./SubstitutionPlan.js";
import Messages from "./Messages.js";
import MyLessons from "./MyLessons.js";
export interface CryptoModule {
    randomUUID(): string;
    encryptAES(value: string, key: string): Promise<string>;
    decryptAES(value: string, key: string): Promise<string>;
    encryptRSA(value: string, publicKey: string): Promise<string>;
}
export interface ResponseObject {
    text(): Promise<string>;
    json(): Promise<any>;
}
export interface FetchWrapperModule {
    fetch(url: string, options?: any): Promise<ResponseObject>;
    getCookie(domain: string, name: string): Promise<{
        key: string;
        value: string;
    }>;
    clearCookies(): Promise<void>;
}
export interface Credentials {
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
    login(credentials: Credentials): Promise<void>;
    fetchAlerts(): Promise<{
        myLessons: {
            alerts: any;
            texts: any;
        } | undefined;
        schedule: {
            alerts: any;
            texts: any;
        } | undefined;
        messages: {
            alerts: any;
            texts: any;
        } | undefined;
        substitution: {
            alerts: any;
            texts: any;
        } | undefined;
    }>;
    fetchApps(): Promise<any>;
    fetchRemainingSessionTime(): Promise<number>;
    keepSessionAlive(): Promise<boolean>;
    static Headers: {
        Accept: string;
        "Content-Type": string;
        "X-Requested-With": string;
    };
    fetchLanguage(): Promise<any>;
    fetchSchoolList(): Promise<any>;
    fetchSchoolData(id: string): Promise<any>;
}
