import Session from "./Session.js";
import HTMLParser from "node-html-parser";
import ReturnObject from "./lib/ReturnObject.js";

export default class MyLessons {
    session;

    constructor(session) {
        this.session = session;
    }

    async fetchCurrentEntries() {
        try {
            const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/meinunterricht.php", { headers: Session.Headers });
            const parsed = HTMLParser.parse(await req.text());

            const current = parsed.querySelector("#aktuellTable tbody").childNodes.filter(cn => cn.nodeType === 1).map(row => {
                const children = row.querySelectorAll("td");
                const upload = children[2].querySelector(".fa-upload")?.parentNode?.parentNode;

                return {
                    id: row.attributes["data-book"],
                    title: children[0].querySelector("h3").textContent.trim(),
                    teacher: children[0].querySelector(".teacher button").attributes["title"],
                    entry: row.attributes["data-entry"] !== undefined ? {
                        id: row.attributes["data-entry"],
                        title: children[1].querySelector(".thema")?.textContent.trim(),
                        date: children[1].querySelector(".datum")?.textContent.trim(),
                        homework: children[1].querySelector(".homework") !== null ?{
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
                            }
                        }),
                        upload: upload !== undefined ? {
                            title: upload.querySelector("button")?.childNodes.find(cn => cn.nodeType === 3 && cn.textContent.trim() !== "").textContent.trim(),
                            open: !upload.querySelector("button")?.classNames.includes("btn-default"),
                            stateText: upload.querySelectorAll("li").filter(n => n.classList.length === 0)[0]?.textContent.trim(), //To-Do: parse on or off
                            uploadedFiles: upload.querySelectorAll("li").length !== 0 ? upload.querySelectorAll("li").filter(n => n.classList.length === 0).slice(1).map(file => file.textContent.trim()) : undefined,
                        } : undefined,
                        futureEntries: children[2].querySelector(".btn-warning.btn-xs")?.textContent?.trim()?.includes("zukünftig") ? children[2].querySelector(".btn-warning.btn-xs")?.textContent?.trim()?.split(" zukünftig")[0]?.replace("+ ", "") : '0',
                    } : undefined,
                }
            });

            return new ReturnObject(true, 0, current);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }
}