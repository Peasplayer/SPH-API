import Session from "./Session.js";
import HTMLParser from "node-html-parser";
import ReturnObject from "./lib/ReturnObject.js";

export default class SubstitutionPlan {
    session;

    constructor(session) {
        this.session = session;
    }

    async fetchSubstitutionPlan() {
        try {
            var req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/vertretungsplan.php", { headers: Session.Headers });
            var text = await req.text();
            var parsed = HTMLParser.parse(text);
            parsed.removeWhitespace();

            var content = parsed.querySelector("#content .row div")
            var subPlans = content.childNodes.filter(cn => cn.nodeType === 1).filter(child => child.id.startsWith("tag")).map(child => {
                var vplan = child.querySelector(".panel-body table");
                var heading = child.querySelector(".panel-heading");

                var entries = [];
                if (vplan.querySelector("tbody .alert-warning") === null)  {
                    entries = vplan.querySelector("tbody").querySelectorAll("tr").map(row => row.querySelectorAll("td").map(cell => {
                        const value = cell.textContent.trim()
                        if (value === "")
                            return undefined;
                        return value;
                    }));
                }

                return {
                    content: {
                        fields: vplan.querySelector("thead tr").querySelectorAll("th").map(cn => {
                            return { key: cn.getAttribute("data-field"), name: cn.textContent.trim() }
                        }),
                        entries
                    },
                    details: {
                        date: child.id.replace("tag", ""),
                        dayName: heading.childNodes.find(c => c.nodeType === 3).textContent.trim(),
                        relativeDay: heading.childNodes.find(c => c.nodeType === 1 && c.rawAttrs === 'class="badge"')
                            ?.textContent?.trim(),
                        week: heading.childNodes.find(c => c.nodeType === 1 && c.classList.contains("woche"))
                            ?.textContent?.trim()?.replace("-Woche", ""),
                    }
                };
            });

            return new ReturnObject(true, 1, subPlans);
        }
        catch (err) {
            return new ReturnObject(false, -1, err);
        }
    }
}