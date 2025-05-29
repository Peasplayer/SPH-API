import Session from "./Session.js";
import HTMLParser from "node-html-parser";
export var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Good"] = 0] = "Good";
    GradeValue[GradeValue["Neutral"] = 1] = "Neutral";
    GradeValue[GradeValue["Bad"] = 2] = "Bad";
})(GradeValue || (GradeValue = {}));
export var GradeType;
(function (GradeType) {
    GradeType[GradeType["Normal"] = 0] = "Normal";
    GradeType[GradeType["Interim"] = 1] = "Interim";
    GradeType[GradeType["Final"] = 2] = "Final";
})(GradeType || (GradeType = {}));
export default class MyLessons {
    session;
    constructor(session) {
        this.session = session;
    }
    async fetchCurrentEntries() {
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/meinunterricht.php", { headers: Session.Headers });
        const parsed = HTMLParser.parse(await req.text());
        parsed.removeWhitespace();
        const current = parsed.querySelector("#aktuellTable tbody")?.childNodes.filter(cn => cn.nodeType === 1).map((row) => {
            const children = row.querySelectorAll("td");
            return {
                id: row.attributes["data-book"],
                title: children[0].querySelector("h3")?.textContent.trim(),
                teacher: children[0].querySelector(".teacher button")?.attributes["title"],
                entry: row.attributes["data-entry"] !== undefined ? {
                    id: row.attributes["data-entry"],
                    title: children[1].querySelector(".thema")?.textContent.trim(),
                    date: children[1].querySelector(".datum")?.textContent.trim(),
                    relativeDate: children[0].querySelector(".label-danger")?.textContent?.trim()?.replace("von ", ""),
                    homework: children[1].querySelector(".homework") !== null ? {
                        text: children[1].querySelector(".homework .text")?.textContent?.trim()?.replaceAll(" \n", "\n"),
                        done: children[1].querySelector(".homework .undone") === null
                    } : undefined,
                    content: children[1].querySelector(".inhalt")?.textContent?.trim(),
                    files: children[2].querySelector(".files ul")?.querySelectorAll(".file")?.map(file => {
                        return {
                            name: file.attributes["data-file"],
                            extension: file.attributes["data-extension"],
                            size: file.querySelector("small")?.textContent?.trim()?.replace("(", "")?.replace(")", ""),
                            link: `https://start.schulportal.hessen.de/meinunterricht.php?a=downloadFile&id=${row.attributes["data-book"]}&e=${row.attributes["data-entry"]}&f=${file.attributes["data-file"]}`
                        };
                    }) ?? [],
                    uploads: children[2].querySelectorAll("button .fa-upload").map(u => u.parentNode.parentNode).filter(u => u !== undefined).map(u => {
                        const listEntries = u.querySelectorAll("li");
                        const divider = listEntries.findIndex(e => e.classList.length !== 0);
                        let deadline = undefined;
                        const rawDeadline = u.querySelector("small");
                        if (rawDeadline !== null) {
                            const deadlineParts = rawDeadline.textContent.trim().split(",")[1].trim().replace("\n", "").replaceAll(/\s\s+/g, ' ').split("um").map(s => s.trim());
                            const now = new Date(Date.now());
                            deadline = Date.parse(`${now.getFullYear()}-${(parseInt(deadlineParts[0].split(".")[1]) - 1).toString().padStart(2, "0")}-${deadlineParts[0].split(".")[0]}T${deadlineParts[1] /*.replace(":", "-")*/.replace(" Uhr", "")}:00Z`);
                        }
                        return {
                            title: u.querySelector("button")?.childNodes?.find(cn => cn.nodeType === 3 && cn.textContent.trim() !== "")?.textContent.trim(),
                            open: !u.querySelector("button")?.classNames.includes("btn-default"),
                            stateText: listEntries.slice(deadline === undefined ? 0 : 1, divider).map(e => e.textContent.trim()), //To-Do: parse on or off
                            deadline,
                            uploadedFiles: divider !== -1 ? listEntries.slice(divider + 1).map(file => file.textContent.trim()) : [],
                        };
                    }),
                } : undefined,
                futureEntries: children[2].querySelector(".btn-warning.btn-xs")?.textContent?.trim()?.includes("zukünftig") ?
                    parseInt((children[2].querySelector(".btn-warning.btn-xs")?.textContent?.trim()?.split(" zukünftig")[0]?.replace("+ ", "") ?? "0")) : 0,
            };
        }) ?? [];
        return current;
    }
    async fetchBookEntries(id) {
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/meinunterricht.php?a=sus_view&id=" + id, { headers: Session.Headers });
        const parsed = HTMLParser.parse(await req.text(), { parseNoneClosedTags: true });
        parsed.removeWhitespace();
        const title = parsed.querySelector("#content h1");
        const book = {
            id: title.attributes["data-book"],
            title: title.textContent.trim(),
            teacher: parsed.querySelector("#content .fa-user").parentNode.attributes["title"],
            futureEntries: 0,
            entries: []
        };
        book.entries = (await Promise.all(parsed.querySelectorAll("#history div div table tbody tr").map(async (t) => {
            if (t.attributes["data-entry"] === undefined)
                return undefined;
            const children = t.childNodes.filter(cn => cn.nodeType === 1);
            return {
                id: t.attributes["data-entry"],
                date: children[0].childNodes.filter(cn => cn.nodeType === 3 && cn.textContent.trim() !== "")[0].textContent.trim(),
                hour: children[0].querySelector("small")?.textContent.trim(),
                title: children[1].querySelector("b")?.textContent.trim(),
                content: children[1].querySelector('i[title="Ausführlicher Inhalt"]')?.parentNode?.textContent?.trim(),
                homework: children[1].querySelector(".homework") !== null ? {
                    text: children[1].querySelectorAll('span.markup').find(s => s.querySelector("i") === null)?.textContent?.trim(),
                    done: children[1].querySelector(".homework .undone.hidden") !== null
                } : undefined,
                files: children[2].querySelector(".files")?.querySelectorAll(".file")?.map(file => {
                    return {
                        name: file.attributes["data-file"],
                        extension: file.attributes["data-extension"],
                        size: file.querySelector("small")?.textContent?.trim()?.replace("(", "")?.replace(")", ""),
                        link: `https://start.schulportal.hessen.de/meinunterricht.php?a=downloadFile&id=${book.id}&e=${t.attributes["data-entry"]}&f=${file.attributes["data-file"]}`
                    };
                }) ?? [],
                uploads: children[1].querySelectorAll(".btn-group").map(u => {
                    //console.log(u)
                    const listEntries = u.querySelectorAll("li");
                    const divider = listEntries.findIndex(e => e.classList.length !== 0);
                    let deadline = undefined;
                    const rawDeadline = u.querySelector("button small");
                    if (rawDeadline !== null) {
                        const deadlineParts = rawDeadline.textContent.trim().split(",")[1].trim().replace("\n", "").replaceAll(/\s\s+/g, ' ').split("um").map(s => s.trim());
                        const now = new Date(Date.now());
                        deadline = Date.parse(`${now.getFullYear()}-${(parseInt(deadlineParts[0].split(".")[1]) - 1).toString().padStart(2, "0")}-${deadlineParts[0].split(".")[0]}T${deadlineParts[1] /*.replace(":", "-")*/.replace(" Uhr", "")}:00Z`);
                    }
                    return {
                        title: u.querySelector("button")?.childNodes.filter(cn => cn.nodeType === 3 && cn.textContent.trim() !== "")[0].textContent.trim(),
                        open: !u.querySelector("button")?.classNames.includes("btn-default"),
                        stateText: listEntries.slice(deadline === undefined ? 0 : 1, divider).map(e => e.textContent.trim().replaceAll(/\s\s+/g, ' ')), //To-Do: parse on or off
                        deadline,
                        uploadedFiles: divider !== -1 ? listEntries.slice(divider + 1).map(file => file.textContent.trim()) : [],
                    };
                }),
                attendance: HTMLParser.parse(await this.session.crypto.decryptAES(children[2].textContent.trim(), this.session.sessionKey))
                    .childNodes.filter(cn => cn.rawTagName !== "div").map(cn => cn.textContent.trim()).join(""),
            };
        }))).filter(e => e !== undefined);
        return book;
    }
    async fetchGrades(id) {
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/meinunterricht.php?a=sus_view&id=" + id, { headers: Session.Headers });
        const parsed = HTMLParser.parse(await req.text());
        parsed.removeWhitespace();
        const gradeTable = parsed.querySelector("#marks tbody");
        if (gradeTable == null)
            return [];
        const gradeTableRows = gradeTable.querySelectorAll("tr");
        const grades = [];
        for (let i = 0; i < gradeTableRows.length; i++) {
            const row = gradeTableRows[i];
            const cells = row.querySelectorAll("td");
            const rawDate = cells[1].textContent.trim().split(", ")[1].split(".");
            let day = 0;
            switch (cells[1].textContent.trim().split(", ")[0]) {
                case "Mo":
                    day = 1;
                    break;
                case "Di":
                    day = 2;
                    break;
                case "Mi":
                    day = 3;
                    break;
                case "Do":
                    day = 4;
                    break;
                case "Fr":
                    day = 5;
                    break;
                case "Sa":
                    day = 6;
                    break;
                case "So":
                    day = 7;
                    break;
            }
            const now = new Date(Date.now());
            let date = new Date(now.getFullYear() + "-" + rawDate[1] + "-" + rawDate[0]);
            if (date.getDay() !== day) {
                date = new Date((now.getFullYear() - 1) + "-" + rawDate[1] + "-" + rawDate[0]);
            }
            let note = undefined;
            if (i < gradeTableRows.length - 1 && gradeTableRows[i + 1].querySelectorAll("td").length < 3) {
                note = gradeTableRows[i + 1].querySelectorAll("td")[1].childNodes?.reverse().find(cn => cn.nodeType === 3 && cn.textContent.trim() !== "")?.textContent.trim();
                i++;
            }
            grades.push({
                name: cells[0].textContent.trim(),
                date: date.getTime(),
                grade: cells[2].textContent.trim(),
                value: cells[2].querySelector("span")?.classList.contains("badge-success") ? GradeValue.Good :
                    (cells[2].querySelector("span")?.classList.contains("badge-danger") ? GradeValue.Bad : GradeValue.Neutral),
                type: row.classList.contains("warning") ? GradeType.Interim : (row.classList.contains("success") ? GradeType.Final : GradeType.Normal),
                note
            });
        }
        return grades;
    }
    async fetchExams(id) {
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/meinunterricht.php?a=sus_view&id=" + id, { headers: Session.Headers });
        const parsed = HTMLParser.parse(await req.text());
        parsed.removeWhitespace();
        const examsList = parsed.querySelector("#klausuren ul");
        if (examsList === null)
            return [];
        return examsList.querySelectorAll("li")?.map(e => {
            const data = e.textContent.trim().replace(" ", "%%%SEPERATOR%%%").split("%%%SEPERATOR%%%");
            return {
                name: data[1],
                date: (new Date(data[0].split(".").reverse().join("-"))).getTime()
            };
        }) ?? [];
    }
}
