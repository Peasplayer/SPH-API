//import fs from "node:fs";
import HTMLParser from "node-html-parser";
import Session from "./Session.js";
import ReturnObject from "./lib/ReturnObject.js";
export default class Schedule {
    session;
    constructor(session) {
        this.session = session;
    }
    async fetchStudentPlan(date) {
        try {
            /*
            var file = fs.readFileSync("./BECK.htm", {encoding: 'utf8'});
            var parsed = HTMLParser.parse(file);//(await req.text());
            */
            const plans = {
                own: undefined,
                all: undefined,
                unknown: undefined
            };
            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/stundenplan.php" + (date !== undefined ? "?a=detail_klasse&e=1&date=" + date : ""), { headers: Session.Headers });
            const parsed = HTMLParser.parse(await req.text());
            parsed.removeWhitespace();
            let plan = parsed.querySelector("#own")?.querySelector("tbody");
            if (plan !== undefined && plan !== null) {
                const ownPlan = parsed.querySelector("#own");
                plans.own = {
                    details: this.#parsePlanDetails(ownPlan),
                    rows: this.#parseScheduleRows(plan.querySelectorAll("tr"))
                };
            }
            plan = parsed.querySelector("#all")?.querySelector("tbody");
            if (plan !== undefined && plan !== null) {
                const allPlan = parsed.querySelector("#all");
                plans.all = {
                    details: this.#parsePlanDetails(allPlan),
                    rows: this.#parseScheduleRows(plan.querySelectorAll("tr"))
                };
            }
            if (plans.own === undefined && plans.all === undefined) {
                plan = parsed.querySelector(".plan")?.querySelector("tbody");
                if (plan !== undefined && plan !== null) {
                    const unknownPlan = parsed.querySelector(".plan")?.parentNode;
                    plans.unknown = {
                        details: this.#parsePlanDetails(unknownPlan),
                        rows: this.#parseScheduleRows(plan.querySelectorAll("tr"))
                    };
                }
            }
            if (plans.own === undefined && plans.all === undefined && plans.unknown === undefined) {
                return new ReturnObject(parsed, 6);
            }
            return new ReturnObject(plans);
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
    getEntireDay(plan, day) {
        try {
            return new ReturnObject(plan.rows.map(hour => { return { hour: hour.hour, subjects: hour.subjects[day] }; }));
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
    #parsePlanDetails(planContainer) {
        const currentWeek = planContainer.querySelector("#aktuelleWoche");
        const planSelector = planContainer?.querySelector("#dateSelect")
            ?.querySelectorAll("option")?.map((option) => {
            return { text: option.text.trim(), value: option.attributes["value"], current: option.attributes["selected"] === "selected" };
        }) ?? undefined;
        const validSince = planContainer.querySelector(".col-md-6");
        return {
            title: planContainer.querySelector("h2")?.text,
            date: planContainer.querySelector(".plan")?.attributes["data-date"],
            currentWeek: currentWeek ? {
                date: currentWeek?.parentNode.text.split(":")[0],
                week: currentWeek?.text,
                fullText: currentWeek?.parentNode.text
            } : undefined,
            planSelector: planSelector,
            validSince: validSince?.textContent?.trim()?.startsWith("Stundenplan gültig") ? validSince.textContent.split("ab ")[1]?.trim() : undefined
        };
    }
    #parseScheduleRows(rows) {
        rows.shift();
        return rows.map((row) => {
            const columns = row.querySelectorAll("td");
            const hourColumn = columns.shift();
            const subjects = [[], [], [], [], []];
            columns.forEach(column => {
                subjects[columns.indexOf(column)] = column.querySelectorAll(".stunde") //childNodes.filter((subject: Node) => subject.classNames.includes("stunde"))
                    .map((subject) => {
                    const rawData = subject.attributes.title.trim();
                    const data = {
                        id: subject.attributes['data-mix'],
                        rawTitle: subject.attributes.title,
                        subject: ""
                    };
                    data.teacher = subject.querySelector("small")?.text?.trim();
                    if (data.teacher === "")
                        data.teacher = undefined;
                    data.span = parseInt(column.attributes.rowspan);
                    const inRoom = rawData.includes("im Raum");
                    const withClass = rawData.includes("bei der Klasse/Stufe/Lerngruppe");
                    const inWeeks = rawData.search(/in .*-Wochen/g) !== -1;
                    if (!inRoom && !withClass && !inWeeks) {
                        data.subject = rawData;
                        return data;
                    }
                    data.subject = (inRoom ? rawData.match(/(.*)(?= im Raum)/g)?.at(0) :
                        (withClass ? rawData.match(/(.*)(?= bei der Klasse\/Stufe\/Lerngruppe)/g)?.at(0) :
                            rawData.match(/(.*)(?= in .*-Wochen)/g)?.at(0))) ?? rawData;
                    data.room = !withClass && !inWeeks ? rawData.match(/(?<=im Raum )(.*)/g)?.at(0) :
                        (withClass ? rawData.match(/(?<=im Raum )(.*)(?= bei der Klasse\/Stufe\/Lerngruppe)/g)?.at(0) :
                            rawData.match(/(?<=im Raum )(.*)(?= in .*-Wochen)/g)?.at(0));
                    data.group = !inWeeks ? rawData.match(/(?<=bei der Klasse\/Stufe\/Lerngruppe )(.*)/g)?.at(0) :
                        rawData.match(/(?<=bei der Klasse\/Stufe\/Lerngruppe )(.*)(?= in .*-Wochen)/g)?.at(0);
                    data.week = rawData.match(/(?<=in )(.*)(?=-Wochen)/g)?.at(0);
                    return data;
                });
            });
            return {
                hour: {
                    calc: rows.indexOf(row) + 1,
                    number: parseInt(hourColumn?.querySelector(".hidden-print")?.text?.replace(".", "") ?? "-1"),
                    text: hourColumn?.querySelector(".print-show b")?.text?.toString(),
                    duration: hourColumn?.querySelector(".VonBis")?.text?.toString()
                },
                subjects
            };
        });
    }
}
