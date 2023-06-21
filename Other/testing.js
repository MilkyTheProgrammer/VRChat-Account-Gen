const fs = require("fs");
// const contents = fs.readFileSync("../Modules/GeneratedAccounts.txt", 'utf-8');
// const arr = contents.split(/\r?\n/);


// arr.forEach(item => {
//     console.log(item.split(" ")[15] + ":" + item.split(" ")[12])
// })

const proxies = fs.readFileSync("../Modules/proxies.txt", 'utf-8');

    const proxyArr = proxies.split(/\r?\n/);
    var prox = proxyArr[Math.round(Math.random() * proxyArr.length)]

    var spliced = prox.split(":")[3];
    var proxx = prox.split(":")[2] + ":" + prox.split(":")[3] + "@" + prox.split(":")[0] + ":" + prox.split(":")[1]
console.log(proxx);