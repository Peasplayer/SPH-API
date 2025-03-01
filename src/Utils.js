export default class Utils {
    static parseStringDate(date) {
        date = date.replace("um ", "").replace(" Uhr", "");
        const dateParts = date.split(" ");
        const dateString = dateParts[0] === "heute" ? new Date(Date.now()).toISOString().split("T")[0]
            : (dateParts[0] === "gestern" ? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                : dateParts[0]);
        return Date.parse(dateString.split(".").reverse().join("-") + "T" + dateParts[1]);
    }
}