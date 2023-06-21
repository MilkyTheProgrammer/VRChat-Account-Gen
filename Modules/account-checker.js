const fs = require("fs");
const vrchat = require('vrchat')

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

var contents = "";

var files = fs.readdirSync("./");
files.forEach(file => {
    if (file.includes("Accounts")) {
        var p = prompt(`Is ${file} the file containing the accounts (y/n)? `);
        if (p == "y") {
            contents = fs.readFileSync(`./${file}`, 'utf-8');
        } if (p == "n") {
            console.log("Please put a file in this folder containing your accounts.. Make sure that the file name has the word Accounts on it!")
        }
    }
})

const arr = contents.split(/\r?\n/);
arr.forEach(async element => {
        if (typeof(element.split(":")) == "undefined") return;
        var args = element.split(":");

        fetch('https://api.vrchat.cloud/api/1/auth/user', {
        method: 'GET',
        headers: {
            "Authorization": "Zmx1ZmZ5Zm9vbml4Ok9jdG9iZXI4MjAwNUA="
        },
    }).then(res => res.text()).then(console.log);
        
        // if ( await api.getCurrentUser().data.error) {
        //     if (await api.getCurrentUser().data.error.message.includes("Invalid")) {
        //         console.log("\x1b[31m", "Invalid Account: " + args[0])
        //     }
        //     // if (api.getCurrentUser())
        // } else {
        //     console.log("\x1b[32m", "Account is valid: " + args[0]);
        // }
});