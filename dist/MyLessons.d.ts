import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
export default class MyLessons {
    session: Session;
    constructor(session: Session);
    fetchCurrentEntries(): Promise<ReturnObject>;
    fetchBookEntries(id: string): Promise<ReturnObject>;
}
