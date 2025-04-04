import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
interface Homework {
    text: string;
    done: boolean;
}
interface File {
    name: string;
    extension: string;
    size: string;
    link: string;
}
interface Upload {
    title: string;
    open: boolean;
    stateText: string[];
    uploadedFiles: string[];
}
interface Entry {
    id: string;
    title: string;
    date: string;
    relativeDate?: string | undefined;
    hour?: string | undefined;
    content: string | undefined;
    homework: Homework | undefined;
    files: File[];
    uploads: Upload[];
    attendance?: string;
}
interface Book {
    id: string;
    title: string;
    teacher: string;
    futureEntries: number;
}
interface PreviewBook extends Book {
    entry: Entry | undefined;
}
interface DetailsBook extends Book {
    entries: Entry[];
}
export default class MyLessons {
    session: Session;
    constructor(session: Session);
    fetchCurrentEntries(): Promise<ReturnObject<Error> | ReturnObject<PreviewBook[]>>;
    fetchBookEntries(id: string): Promise<ReturnObject<Error> | ReturnObject<DetailsBook>>;
}
export {};
