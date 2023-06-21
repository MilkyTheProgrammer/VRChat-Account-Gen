const fs = require("fs");
const contents = fs.readFileSync("./GeneratedAccounts.txt", 'utf-8');
const vrc = require('vrchat-client')

var arrayCount = 0;

var prompt = require('prompt-sync')();
//
// get input from the user.
//
const arr = contents.split(/\r?\n/);
arr.forEach(async element => {
    try {
        if (typeof(element.split(" ")) == "undefined") return;
        var args = element.split(" ");
        if (args[5] == "undefined") return;
        if (args[5] == "Email:") return;
        console.log(args[5], args[8]);

        let api = await vrc.login(args[5], args[8]);

        console.log(await api.user.getUserInfo());
    } catch(err) {

    }
});