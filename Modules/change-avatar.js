const fs = require("fs");
const contents = fs.readFileSync("../Modules/GeneratedAccounts.txt", 'utf-8');
const vrc = require('vrchat')

function start() {
    var title = 
    "\x1b[35mdP     dP                   oo          dP           .88888.                    \n"+
    "88     88                               88          d8'   `88                   \n"+
    "88    .8P .d8888b. 88d888b. dP .d8888b. 88d888b.    88        .d8888b. 88d888b. \n"+
    "88    d8' 88'  `88 88'  `88 88 Y8ooooo. 88'  `88    88   YP88 88ooood8 88'  `88 \n"+
    "88  .d8P  88.  .88 88    88 88       88 88    88    Y8.   .88 88.  ... 88    88 \n"+
    "888888'   `88888P8 dP    dP dP `88888P' dP    dP     `88888'  `88888P' dP    dP \n"+
    "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo\n\n\n"
    
    console.clear();
    console.log(title);
    }
    
    start();
    
var prompt = require('prompt-sync')();
//
// get input from the user.
//

var avatarID = prompt("Enter an AvatarID: ");

const arr = contents.split(/\r?\n/);
arr.forEach(element => {
    if (element.split(" ")[15] == "undefined") return;
    if (element.split(" ")[15] == "AuthToken:") {
        element = element.split(" ")[16]
    } else {
        element = element.split(" ")[15]
    }
    try {
        fetch(`https://vrchat.com/api/1/avatars/${avatarID}/select`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": `apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26; auth=${args[15]}; amplitude_id_a750df50d11f21f712262cbd4c0bab37vrchat.com=eyJkZXZpY2VJZCI6ImIyM2MzZGE2LTM4MTgtNDUzNC04Yjg3LTFkZTU2ZWIwODU0MFIiLCJ1c2VySWQiOiJ1c3JfOGJjYTdjNTYtYTE2YS00ZmJmLWFmMjItMzdlNjhhNzA0MGY4Iiwib3B0T3V0IjpmYWxzZSwic2Vzc2lvbklkIjoxNjY4MzAzNDk5ODE3LCJsYXN0RXZlbnRUaW1lIjoxNjY4MzA1ODkyMTg4LCJldmVudElkIjo1NjgsImlkZW50aWZ5SWQiOjAsInNlcXVlbmNlTnVtYmVyIjo1Njh9`,
            "Referer": "https://vrchat.com/home/avatars",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "PUT"
        }).then(res => res.text()).then(console.log)
    } catch(err) {

    }
});

console.log("\x1b[32m", "Avatar Set Successfully!");