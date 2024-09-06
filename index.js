import Crypto from './api/lib/Crypto.js';
import Session from "./api/Session.js";

/*Session.fetchSchoolList().then(res => {
    if (res.success)
        console.log(res.data.find(cat => cat.Name.includes("Wetteraukreis")))
})*/

var session = new Session(true);
session.login(***REMOVED***)
    .then(async result => {
        console.log(result)
        //session.fetchApps().then(result => console.log(result))

        var studentPlan = await session.Schedule.fetchStudentPlan();
        if (studentPlan.success) {
            console.log(session.Schedule.getEntireDay(studentPlan.data.rows, 1).data.find(obj => obj.hour.number === 8).subjects);
        }

        setTimeout(() => session.keepSessionAlive(), 1000);
    })


/*Session.fetchSchoolData(6289).then(data => {
    console.log(data)
    console.log(Session._cache.schoolData)
})*/