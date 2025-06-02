import Session from "./Session.js";
export interface PlanDetails {
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
export interface Subject {
    id: string;
    teacher?: string;
    subject: string;
    room?: string;
    group?: string;
    week?: string;
    span?: number;
    rawTitle: string;
}
export interface PlanRow {
    hour: {
        calc: number;
        number: number;
        text: string | undefined;
        duration: string | undefined;
    };
    subjects: Subject[][];
}
export interface PlanDay {
    hour: {
        calc: number;
        number: number;
        text: string | undefined;
        duration: string | undefined;
    };
    subjects: Subject[];
}
export interface Plan {
    details: PlanDetails;
    rows: PlanRow[];
}
export default class Schedule {
    #private;
    session: Session;
    constructor(session: Session);
    fetchStudentPlan(date?: string): Promise<{
        own?: Plan;
        all?: Plan;
        unknown?: Plan;
    } | undefined>;
    getEntireDay(plan: Plan, day: number): PlanDay[];
}
