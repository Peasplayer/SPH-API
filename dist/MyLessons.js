import Session from "./Session.js";
import HTMLParser from "node-html-parser";
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
                        return {
                            title: u.querySelector("button")?.childNodes?.find(cn => cn.nodeType === 3 && cn.textContent.trim() !== "")?.textContent.trim(),
                            open: !u.querySelector("button")?.classNames.includes("btn-default"),
                            stateText: listEntries.slice(0, divider).map(e => e.textContent.trim()), //To-Do: parse on or off
                            uploadedFiles: listEntries.slice(divider + 1).map(file => file.textContent.trim()),
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
                title: children[1].querySelector("big").textContent.trim(),
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
                    return {
                        title: u.querySelector("button")?.childNodes.filter(cn => cn.nodeType === 3 && cn.textContent.trim() !== "")[0].textContent.trim(),
                        open: !u.querySelector("button")?.classNames.includes("btn-default"),
                        stateText: listEntries.slice(0, divider).map(e => e.textContent.trim().replaceAll(/\s\s+/g, ' ')), //To-Do: parse on or off
                        uploadedFiles: listEntries.slice(divider + 1).map(file => file.textContent.trim()),
                    };
                }),
                attendance: HTMLParser.parse(await this.session.crypto.decryptAES(children[2].textContent.trim(), this.session.sessionKey)).querySelector("span")?.textContent.trim(),
            };
        }))).filter(e => e !== undefined);
        return book;
    }
}
