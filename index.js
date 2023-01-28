const fs = require('fs');
const sessionManager = new (require('./SessionManager'))();

if (!fs.existsSync("./config.json"))
    fs.writeFileSync("./config.json", JSON.stringify({ name: "Vorname.Nachname", password: "Passwort"}))

const config = JSON.parse(fs.readFileSync("./config.json"))
sessionManager.login(config).then(() => sessionManager.fetchDelegationTable());