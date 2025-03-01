# SPH-API
Inoffizielle API um die Daten des hessischen Schulportals abzurufen
## Features
- [x] Stundenplan
- [x] Vertretungsplan
- [ ] Mein Untericht
- [x] Nachrichten
- [ ] Lerngruppen
- [ ] Dateispeicher
- [ ] Dateiverteilung

## Benutzung
> **_Anmerkung:_** Für maximale Kompatibilität lassen sich das Verschlüsselungs- und Request-Modul austauschen. Siehe [Kompatibilität](#kompatibilität)
To-Do

### Kompatibilität
Standard-Implementierungen finden Sie [hier](https://www.npmjs.com/package/sph-api-default-implementations).
#### DefaultCrypto-Modul
Struktur:
````javascript
var crypto = {
    randomUUID: () => {},
    encryptAES: (value, key) => {}, // Gibt verschlüsselten string (utf-8) zurück
    decryptAES: (value, key) => {}, // Gibt entschlüsselten string (utf-8) zurück
    encryptRSA: (value, publicKey) => {} // Gibt verschlüsselten string (base64) zurück
}
````
#### Request-Modul
Struktur des DefaultFetchWrapper:
````javascript
var fetchWrapper = {
    fetch: async (url, options) => {}, // Gibt ResponseObject zurück (Siehe unten),
    getCookie: async (domain, name) => {}, // Gibt Cookie-Objekt zurück (Erforderliche Parameter: value)
    clearCookies: async () => {} // Löscht alle vorhandenen Cookies
}
````
Struktur des ResponseObject:
````javascript
var responseObject = {
    defaultObject: response, // Das Objekt, dass normalerweise von der request-/fetch-Methode zurückgegeben wird
    text: async () => {}, // Gibt Antwort als string zurück
    json: async () => {} // Gibt Antwort als JSON-Objekt zurück
}
````