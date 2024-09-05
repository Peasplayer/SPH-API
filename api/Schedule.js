//import fs from "node:fs";
import HTMLParser from "node-html-parser";
import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";

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

        try {
            var req = await this.session.fetch("https://start.schulportal.hessen.de/stundenplan.php", { headers: Session.Headers });
            var parsed = HTMLParser.parse(await req.text());
            parsed.removeWhitespace();
            var plan = parsed.querySelector("#own")?.querySelector("tbody");
            if (plan !== undefined && plan !== null) {
                var ownPlan = parsed.querySelector("#own");
                return new ReturnObject(true, 0, {
                    type: "all",
                    details: this._parsePlanDetails(ownPlan),
                    rows: this._parseScheduleRows(plan.childNodes)
                });
            }

            plan = parsed.querySelector("#all").querySelector("tbody");
            if (plan !== undefined && plan !== null) {
                var allPlan = parsed.querySelector("#all");
                return new ReturnObject(true, 0, {
                    type: "all",
                    details: this._parsePlanDetails(allPlan),
                    rows: this._parseScheduleRows(plan.childNodes)
                });
            }

            plan = parsed.querySelector(".plan").querySelector("tbody");
            if (plan !== undefined && plan !== null) {
                var unknownPlan = parsed.querySelector(".plan").parentNode;
                return new ReturnObject(true, 0, {
                    type: undefined,
                    details: this._parsePlanDetails(unknownPlan),
                    rows: this._parseScheduleRows(plan.childNodes)
                });
            }

            return new ReturnObject(false, 6, parsed);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    getEntireDay(plan, day) {
        try {
            return new ReturnObject(true, 0, plan.map(hour => { return { hour: hour.hour, subjects: hour.subjects[day] } }));
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }

    _parsePlanDetails(planContainer) {
        var currentWeek = planContainer.querySelector("#aktuelleWoche");
        var planSelector = planContainer.querySelector("#dateback")?.closest("div")?.querySelector("#dateSelect")
            ?.childNodes?.map(option => {
                return { text: option.text, value: option.attributes["value"], current: option.attributes["selected"] === "selected" };
            }) ?? undefined;
        var validSince = planContainer.querySelector(".col-md-6");
        return {
            title: planContainer.querySelector("h2").text,
            date: planContainer.querySelector(".plan").attributes["data-date"],
            currentWeek: {
                date: currentWeek.parentNode.text.split(":")[0],
                week: currentWeek.text,
                fullText: currentWeek.parentNode.text
            },
            planSelector: planSelector,
            validSince: validSince?.text.startsWith("Stundenplan gültig") ? validSince.text : undefined
        }
    }

    _parseScheduleRows(rows) {
        rows.shift();
        return rows.map(row => {
            var columns = row.childNodes;
            var hourColumn = columns.shift();
            return {
                hour: {
                    calc: rows.indexOf(row) + 1,
                    number: parseInt(hourColumn.querySelector(".hidden-print")?.text?.replace(".", "")),
                    text: hourColumn.querySelector(".print-show b")?.text,
                    duration: hourColumn.querySelector(".VonBis")?.text
                },
                subjects: columns.map(column => column.childNodes.filter(subject => subject.classNames.includes("stunde"))
                    .map(subject => {
                        var rawData = subject.attributes.tittttttle.trim();
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
}