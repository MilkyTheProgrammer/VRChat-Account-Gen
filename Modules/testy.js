const VRWorker = require("./gen");
const config = require("../config.json");

var workers = [];

for (var i = 0; i < 2; i++) {
    workers.push(new VRWorker());
}
workers.forEach(worker => worker.runAsync(config["2captcha-key"]));