//import fs from "node:fs";
import HTMLParser from "fast-html-parser";
import Session from "./Session.js";

export default class Schedule {
    session;

    constructor(session) {
        this.session = session;
    }

    async fetchStudentPlan() {
        /*
        var file = fs.readFileSync("./BECK.htm", {encoding: 'utf8'});
        var parsed = HTMLParser.parse(file);//(await req.text());
        */

        var req = await this.session.fetch("https://start.schulportal.hessen.de/stundenplan.php", { headers: Session.Headers });
        var parsed = HTMLParser.parse(await req.text());
        parsed.removeWhitespace();
        var plan = parsed.querySelector("#own") ?? parsed.querySelector("#all") ?? parsed;
        return this.parseScheduleRows(plan.querySelector("tbody").childNodes)
    }

    parseScheduleRows(rows) {
        rows.shift();
        return rows.map(row => {
            var columns = row.childNodes;
            columns.shift();
            return {
                hour: rows.indexOf(row) + 1,
                subjects: columns.map(column => column.childNodes.filter(subject => subject.classNames.includes("stunde"))
                    .map(subject => {
                        var rawData = subject.attributes.title.trim();
                        var cleanedData = rawData.replace("im Raum", ";;;")
                            .replace("bei der Klasse/Stufe/Lerngruppe", ";;;").trim();
                        var splitData = cleanedData.split(";;;").map(data => {
                            data = data.trim()
                            return data === "" ? undefined : data;
                        });

                        var currentDataIndex = 0;
                        var data = {};
                        data.subject = cleanedData.startsWith("im Raum") || cleanedData.startsWith("bei der Klasse/Stufe/Lerngruppe") ? undefined : splitData[currentDataIndex];
                        currentDataIndex++;
                        if (rawData.includes("im Raum")) {
                            data.room = splitData[currentDataIndex];
                            currentDataIndex++;
                        }
                        else
                            data.room = undefined;
                        if (rawData.includes("bei der Klasse/Stufe/Lerngruppe")) {
                            data.group = splitData[currentDataIndex];
                            currentDataIndex++;
                        }
                        else
                            data.group = undefined;

                        data.teacher = subject.querySelector("small").text.trim()
                        if (data.teacher === "")
                            data.teacher = undefined;
                        data.id = subject.attributes['data-mix'];
                        data.span = column.attributes.rowspan;
                        data.rawTitle = subject.attributes.title;
                        return data;
                    }))
            };
        });
    }

    getEntireDay(plan, day) {
        return plan.map(hour => { return { hour: hour.hour, subjects: hour.subjects[day] } });
    }
}