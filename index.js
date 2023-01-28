/*const scrapingbee = require('scrapingbee'); // Import ScrapingBee's SDK
const fs = require('fs');

async function login_and_take_screenshot(url, path) {
    var client = new scrapingbee.ScrapingBeeClient(''); // New ScrapingBee client
    var response = await client.get({
        url: url,
        params: {
            'js_scenario': {"instructions":[
                    {"fill": ["#inputEmail", ""]}, // Enter registration email
                    {"fill": ["#inputPassword", ""]}, // Enter password
                    {"click": "#alllogin"}, // Click on login
                    {"wait": 3000} // Wait for a second
                ]},
            'screenshot': 'true'
        }
    }).then((response)=>fs.writeFileSync(path, response.data)) // Save the contents of the request (screenshot) to the 'path' file destination
        .catch((e)=>console.log("An error has occured: " + e.message))
}

login_and_take_screenshot("https://start.schulportal.hessen.de/index.php?i=6079", "./my-account.png");*/

/*const fetch = require('node-fetch');

fetch("https://login.schulportal.hessen.de/?i=6079", {
    method: 'POST',
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    credentials: 'include',
    body: { user: "", password: "" }
}).then(res => res.text())
    .then(body => console.log(body));*/
var cookieManager = require('./CookieManager');
cookieManager.prototype.setup();