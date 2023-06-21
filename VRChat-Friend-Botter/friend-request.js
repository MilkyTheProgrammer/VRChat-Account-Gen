// Step 1. We begin with creating a Configuration, which contains the username and password for authentication.
const fs = require("fs");
const contents = fs.readFileSync("../Modules/GeneratedAccounts.txt", 'utf-8');

const sendFriendRequest = require("./test2");

var arrayCount = 0;

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

var prompt = require('prompt-sync')();
//
// get input from the user.
//
var n = prompt('User ID to friend: ');

const arr = contents.split(/\r?\n/);

setInterval(() => {
    try {
        arr.forEach(item => {
            if (item.split(" ")[15] == "AuthToken:") {
                item = item.split(" ")[16]
            } else {
                item = item.split(" ")[15]
            }
            sendFriendRequest(n, item);
        });
    } catch(err) {
    }
}, 2000);