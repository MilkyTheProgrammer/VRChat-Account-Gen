const fs = require("fs");
const contents = fs.readFileSync("../Modules/GeneratedAccounts.txt", 'utf-8');
const vrc = require('vrchat-client')

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

var status = prompt("Enter Status: ");

const arr = contents.split(/\r?\n/);
arr.forEach(async element => {
        if (typeof(element.split(" ")) == "undefined") return;
        var args = element.split(" ");

        const api = await vrc.login(args[5], args[8]);
        api.user.updateUserInfo({
            status: "active",
            statusDescription: ""
        })
});

start();

console.log("\x1b[32m", "Avatar Set Successfully!");