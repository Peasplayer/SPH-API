import Session from "../src/Session.js";
import fs from "node:fs";
import DefaultCrypto from "../default/DefaultCrypto.js";
import DefaultFetchWrapper from "../default/DefaultFetchWrapper.js";

const credentials = JSON.parse(fs.readFileSync('../test/credentials.json', 'utf8'));

/*Session.fetchSchoolList().then(res => {
    if (res.success)
        console.log(res.data.find(cat => cat.Name.includes("Wetteraukreis")))
})*/

var session = new Session(new DefaultCrypto(), new DefaultFetchWrapper());
session.login(credentials["2"])
    .then(async result => {
        console.log(result)
        //session.fetchApps().then(result => console.log(result))

        var studentPlan = await session.Schedule.fetchStudentPlan();
        if (studentPlan.success) {
            console.log(session.Schedule.getEntireDay(studentPlan.data.rows, 1).data.find(obj => obj.hour.number === 8).subjects);
        }

        setTimeout(async () => console.log(await session.keepSessionAlive()), 1000);
    })


/*Session.fetchSchoolData(6289).then(data => {
    console.log(data)
    console.log(Session._cache.schoolData)
})*/