export default class Utils {
    static parseStringDate(date) {
        date = date.replace("um ", "").replace(" Uhr", "");
        const dateParts = date.split(" ");
        const dateString = dateParts[0] === "heute" ? new Date(Date.now()).toLocaleDateString("de", {timeZone: "Europe/Berlin"})
            : (dateParts[0] === "gestern" ? new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString("de", {timeZone: "Europe/Berlin"})
                : dateParts[0]);
        return Date.parse(dateString.split(".").map(i => i.padStart(2, "0")).reverse().join("-") + "T" + dateParts[1]);
    }

    static unescapeHTML(str) {
        return str.replace(
            /&amp;|&lt;|&gt;|&#39;|&quot;/g,
            (tag) =>
                ({
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&#39;': "'",
                    '&quot;': '"'
                }[tag] || tag)
        );
    }
}