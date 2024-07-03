import Crypto from './api/lib/Crypto.js';
import Session from "./api/Session.js";
import HTMLParser from "fast-html-parser";

var session = new Session(true);
session.login(***REMOVED***)
    .then(async result => {
        console.log(result)
        //session.fetchApps().then(result => console.log(result))

        console.log(session.Schedule.getEntireDay(await session.Schedule.fetchStudentPlan(), 3));
        setTimeout(() => session.fetchRemainingSessionTime(), 1000)
    })


/*Session.fetchSchoolData(6289).then(data => {
    console.log(data)
    console.log(Session._cache.schoolData)
})*/