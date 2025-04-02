import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
export default class SubstitutionPlan {
    session: Session;
    constructor(session: Session);
    fetchSubstitutionPlan(): Promise<ReturnObject>;
}
