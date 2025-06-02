import Session from "./Session.js";
import HTMLParser, {HTMLElement, Node} from "node-html-parser";
import Utils from "./Utils.js";

export interface SubstitutionPlanDay {
    content: {
        fields: {key: string, name: string}[];
        entries: (string|undefined)[][];
    };
    details: {
        date: string;
        dayName: string;
        relativeDay: string|undefined;
        week: string|undefined;
        updateTimeStamp: number;
    };
}

export default class SubstitutionPlan {
    session: Session;

    constructor(session: Session) {
        this.session = session;
    }

    async fetchSubstitutionPlan(): Promise<SubstitutionPlanDay[]> {
        const req = await this.session.fetchWrapper.fetch("https://start.schulportal.hessen.de/vertretungsplan.php", { headers: Session.Headers });
        const parsed = HTMLParser.parse(await req.text());
        parsed.removeWhitespace();

        const content = parsed.querySelector("#content .row div")
        if (content == null)
            return [];

        return content.childNodes.filter((cn: Node) => cn.nodeType === 1)
            .filter((child: HTMLElement) => child.id.startsWith("tag")).map((child: HTMLElement): SubstitutionPlanDay | undefined => {
                const sPlan = child.querySelector(".panel-body table");
                if (sPlan == null)
                    return undefined;

                const heading = child.querySelector(".panel-heading");
                if (heading == null)
                    return undefined;

                let entries: (string | undefined)[][] = [];
                const tableBody = sPlan.querySelector("tbody");
                if (sPlan.querySelector("tbody .alert-warning") === null && tableBody !== null) {
                    entries = tableBody.querySelectorAll("tr").map((row: HTMLElement) =>
                        row.querySelectorAll("td").map((cell: HTMLElement) => {
                            const value = cell.textContent.trim()
                            if (value === "") return undefined;
                            return value;
                        })
                    );
                }

                return {
                    content: {
                        fields: sPlan.querySelector("thead tr")?.querySelectorAll("th")?.map((cn: HTMLElement) => {
                            const field = cn.getAttribute("data-field");
                            if (field === undefined) return undefined;
                            return {key: field, name: cn.textContent.trim()}
                        })?.filter(f => f !== undefined) ?? [],
                        entries
                    },
                    details: {
                        date: child.id.replace("tag", "").replaceAll("_", "."),
                        dayName: heading.childNodes.find((c: Node) => c.nodeType === 3)?.textContent?.trim() ?? "",
                        relativeDay: heading.childNodes.find((c: Node) => c.nodeType === 1 && (c as HTMLElement).rawAttrs === 'class="badge"')
                            ?.textContent?.trim(),
                        week: heading.childNodes.find((c: Node) => c.nodeType === 1 && (c as HTMLElement).classList.contains("woche"))
                            ?.textContent?.trim()?.replace("-Woche", ""),
                        updateTimeStamp: Utils.parseStringDate((child.querySelector(".panel-body .pull-right i")?.textContent.trim()
                            .replace("Letzte Aktualisierung: ", "") as string))
                    }
                };
            }).filter(s => s !== undefined);
    }
}