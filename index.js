const fs = require('fs');
const sessionManager = new (require('./SessionManager'))();
const substitutionPlan = require('./SubstitutionPlan')

if (!fs.existsSync("./config.json"))
    fs.writeFileSync("./config.json", JSON.stringify({ name: "Vorname.Nachname", password: "Passwort"}))

const config = JSON.parse(fs.readFileSync("./config.json"))
sessionManager.login(config).then(() => substitutionPlan.fetchSubstitutionPlan(sessionManager));