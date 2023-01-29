const {default: JSSoup} = require("jssoup");
const fs = require("fs");

class SubstitutionPlan {
    static async fetchSubstitutionPlan(sessionManager) {
        var substitutionPlan = await sessionManager.client.get("https://start.schulportal.hessen.de/vertretungsplan.php", {
            headers: sessionManager.headers
        })

        var soup = new JSSoup(substitutionPlan.data);
        var tables = soup.findAll("table").filter(table => table.attrs.id?.startsWith("vtable"));
        var subs = tables.map(table => {
            return new SubstitutionDay(table);
        })

        fs.writeFile('./SubstitutionPlan.json', JSON.stringify(subs), err => {
            if (err) {
                console.error(err);
            }
        });

        console.log("Substitution plan saved")
    }
}

class SubstitutionDay {
    date;
    subs;

    constructor(table) {
        var rawDate = table.attrs.id.replace("vtable", "").split("_");
        this.date = new Date(`${rawDate[2]}-${rawDate[1]}-${rawDate[0]}`);

        var tableRows = table.find("tbody").findAll("tr");
        if (tableRows.length === 1 && tableRows[0].contents.length === 1) {
            if (process.env.debug) console.log("No substitution on " + this.date.toDateString())
            return;
        }
        else if (process.env.debug) console.log("Got substitution on " + this.date.toDateString())

        this.subs = tableRows.map(row => new Substitution(row))
    }
}

class Substitution {
    lessons;
    class;
    substitute;
    teacher;
    subject;
    subjectOld;
    room;
    note;

    constructor(row) {
        this.lessons = row.contents[0].contents[0]?._text.clearText();
        this.class = row.contents[1].contents[0]?._text.clearText().split(", ");
        this.substitute = row.contents[2].contents[0]?._text.clearText();
        this.teacher = row.contents[3].contents[0]?._text.clearText();
        this.subject = row.contents[4].contents[0]?._text.clearText();
        this.subjectOld = row.contents[5].contents[0]?._text.clearText();
        this.room = row.contents[6].contents[0]?._text.clearText();
        this.note = row.contents[7].contents[0]?._text.clearText();
    }
}

module.exports = SubstitutionPlan;