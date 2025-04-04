import HTMLParser from "node-html-parser";
import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
interface PlanDetails {
    title: string | undefined;
    date: string | undefined;
    currentWeek: {
        date: string | undefined;
        week: string | undefined;
        fullText: string | undefined;
    } | undefined;
    planSelector: {
        text: string;
        value: string;
        current: boolean;
    }[] | undefined;
    validSince?: string;
}
interface Subject {
    id: string;
    teacher?: string;
    subject: string;
    room?: string;
    group?: string;
    week?: string;
    span?: number;
    rawTitle: string;
}
interface PlanRow {
    hour: {
        calc: number;
        number: number;
        text: string | undefined;
        duration: string | undefined;
    };
    subjects: Subject[][];
}
interface Plan {
    details: PlanDetails;
    rows: PlanRow[];
}
export default class Schedule {
    #private;
    session: Session;
    constructor(session: Session);
    fetchStudentPlan(date?: string): Promise<ReturnObject<Error> | ReturnObject<HTMLParser.HTMLElement> | ReturnObject<{
        own?: Plan;
        all?: Plan;
        unknown?: Plan;
    }>>;
    getEntireDay(plan: Plan, day: number): ReturnObject<Error> | ReturnObject<{
        hour: {
            calc: number;
            number: number;
            text: string | undefined;
            duration: string | undefined;
        };
        subjects: Subject[];
    }[]>;
}
export {};
