var { SocksProxyAgent } = require("socks-proxy-agent");
const fetch = require("node-fetch");
var { HttpsProxyAgent } = require('https-proxy-agent');
const fs = require("fs");

const proxies = fs.readFileSync("../Modules/proxies.txt", 'utf-8');

class FRWorker {
    sendFriendRequest(userId, authToken) {
    try {
    const proxyArr = proxies.split(/\r?\n/);
    var prox = proxyArr[Math.round(Math.random() * proxyArr.length)]
    var proxy = prox.split(":")[0] + ":" + prox.split(":")[1];
    fetch(`https://vrchat.com/api/1/user/${userId}/friendRequest`, {
       agent: new HttpsProxyAgent("http://" + proxy),
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": `apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26; auth=${authToken}; amplitude_id_a750df50d11f21f712262cbd4c0bab37vrchat.com=eyJkZXZpY2VJZCI6ImIyM2MzZGE2LTM4MTgtNDUzNC04Yjg3LTFkZTU2ZWIwODU0MFIiLCJ1c2VySWQiOiJ1c3JfN2M3NTY1NzAtNzAzZC00YzhiLTgxOTMtOWRlNTAwNjljZjk0Iiwib3B0T3V0IjpmYWxzZSwic2Vzc2lvbklkIjoxNjY4MTk0NTE2MzM0LCJsYXN0RXZlbnRUaW1lIjoxNjY4MTk1MTM3MDc2LCJldmVudElkIjoxMjUsImlkZW50aWZ5SWQiOjAsInNlcXVlbmNlTnVtYmVyIjoxMjV9`,
        "Referer": `https://vrchat.com/home/user/${userId}`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `{\"params\":{\"userId\":\"${userId}\"}}`,
    "method": "POST"
    }).then(res => res.text()).then(json => {
        if (json.toString().includes("<")) return;
        if (json.toString().includes("Missing Credentials")) {
            this.sendFriendRequest(userId, authToken);
        } else {
            console.log("\x1b[32m", `[✔] Friend request send on ${authToken}!`, "\x1b[31m");
            
        }
        this.sendFriendRequest(userId, authToken);
    })
} catch {
    this.sendFriendRequest(userId, authToken);
}
}
}

module.exports = FRWorker;