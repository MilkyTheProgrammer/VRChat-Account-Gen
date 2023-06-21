const VRWorker = require("./gen");

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

console.log("[1]: Account Generator");
console.log("[2]: Friend Request Botter");
console.log("[3]: Account checker");
console.log("[4]: Change Avatar");
console.log("[5]: Change Bots Status");

var prompt = require('prompt-sync')();
console.log("");

var workers = [];

var option = prompt("Option: ");
if (option == "1") {
    start();
    var amount = prompt("Amount of threads: ");
    var captchaKey = prompt("2Captcha Key: ");
    start();
    for (var i = 0; i < amount; i++) {
        workers.push(new VRWorker());
    }
    workers.forEach(worker => worker.runAsync(captchaKey));
}
else if (option == "2") {
    require("../VRChat-Friend-Botter/friend-request");
}
else if (option == "3") {
    require("../Modules/account-checker");
}
else if (option == "4") {
    require("../Modules/change-avatar");
}
else if (option == "5") {
    require("../Modules/change-status");
}