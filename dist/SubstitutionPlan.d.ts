import Session from "./Session.js";
export interface SubstitutionPlanDay {
    content: {
        fields: {
            key: string;
            name: string;
        }[];
        entries: (string | undefined)[][];
    };
    details: {
        date: string;
        dayName: string;
        relativeDay: string | undefined;
        week: string | undefined;
        updateTimeStamp: number;
    };
}
export default class SubstitutionPlan {
    session: Session;
    constructor(session: Session);
    fetchSubstitutionPlan(): Promise<SubstitutionPlanDay[]>;
}
