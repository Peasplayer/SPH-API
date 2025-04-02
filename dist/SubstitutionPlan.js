import Session from "./Session.js";
import HTMLParser from "node-html-parser";
import ReturnObject from "./lib/ReturnObject.js";
import Utils from "./Utils.js";
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
            var content = parsed.querySelector("#content .row div");
            if (content == null)
                return ReturnObject.NoData;
            var subPlans = content.childNodes.filter((cn) => cn.nodeType === 1)
                .filter((child) => child.id.startsWith("tag")).map((child) => {
                var sPlan = child.querySelector(".panel-body table");
                if (sPlan == null)
                    return undefined;
                var heading = child.querySelector(".panel-heading");
                if (heading == null)
                    return undefined;
                let entries = [];
                const tableBody = sPlan.querySelector("tbody");
                if (sPlan.querySelector("tbody .alert-warning") === null && tableBody !== null) {
                    entries = tableBody.querySelectorAll("tr").map((row) => row.querySelectorAll("td").map((cell) => {
                        const value = cell.textContent.trim();
                        if (value === "")
                            return undefined;
                        return value;
                    }));
                }
                return {
                    content: {
                        fields: sPlan.querySelector("thead tr")?.querySelectorAll("th")?.map((cn) => {
                            const field = cn.getAttribute("data-field");
                            if (field === undefined)
                                return undefined;
                            return { key: field, name: cn.textContent.trim() };
                        })?.filter(f => f !== undefined) ?? [],
                        entries
                    },
                    details: {
                        date: child.id.replace("tag", "").replaceAll("_", "."),
                        dayName: heading.childNodes.find((c) => c.nodeType === 3)?.textContent?.trim() ?? "",
                        relativeDay: heading.childNodes.find((c) => c.nodeType === 1 && c.rawAttrs === 'class="badge"')
                            ?.textContent?.trim(),
                        week: heading.childNodes.find((c) => c.nodeType === 1 && c.classList.contains("woche"))
                            ?.textContent?.trim()?.replace("-Woche", ""),
                        updateTimeStamp: Utils.parseStringDate(child.querySelector(".panel-body .pull-right i")?.textContent.trim()
                            .replace("Letzte Aktualisierung: ", ""))
                    }
                };
            });
            return new ReturnObject(subPlans);
        }
        catch (err) {
            return ReturnObject.Error(err);
        }
    }
}
