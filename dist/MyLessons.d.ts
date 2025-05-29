import Session from "./Session.js";
export interface Homework {
    text: string;
    done: boolean;
}
export interface File {
    name: string;
    extension: string;
    size: string;
    link: string;
}
export interface Upload {
    title: string;
    open: boolean;
    stateText: string[];
    deadline: number | undefined;
    uploadedFiles: string[];
}
export interface Entry {
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
export interface Book {
    id: string;
    title: string;
    teacher: string;
    futureEntries: number;
}
export interface PreviewBook extends Book {
    entry: Entry | undefined;
}
export interface DetailsBook extends Book {
    entries: Entry[];
}
export declare enum GradeValue {
    Good = 0,
    Neutral = 1,
    Bad = 2
}
export declare enum GradeType {
    Normal = 0,
    Interim = 1,
    Final = 2
}
export interface Grade {
    name: string;
    date: number;
    grade: string;
    value: GradeValue;
    type: GradeType;
    note?: string;
}
export default class MyLessons {
    session: Session;
    constructor(session: Session);
    fetchCurrentEntries(): Promise<PreviewBook[]>;
    fetchBookEntries(id: string): Promise<DetailsBook>;
    fetchGrades(id: string): Promise<Grade[]>;
}
