const fetch = require("node-fetch");
// create an inbox
const { generateFromEmail, generateUsername } = require("unique-username-generator");
const  EmailV = require("../Modules/imap")
var UsernameGenerator = require('username-generator');
const { EmbedBuilder } = require("discord.js");

const fs = require("fs");

const config = require("../config.json");
var { HttpsProxyAgent } = require('https-proxy-agent');

var names = [
    "Serv1",
    "Serv2",
    "Serv3",
    "Serv4",
    "Serv5",
    "Serv6",
    "Serv7",
    "Serv8",
    "Serv9"
]

var emailCount = 0;

var os = ["о", "ο", "օ"];
var year = 2000;
var month = Math.round(Math.random() * 12);
var day = Math.round(Math.random() * 31);

var inbox = null;
var emailAddress = "";
var userID = "";
var inboxID = "";

function makeid(length)
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

class VRWorker {
runAsync(captchaKey, interaction) {
    new Promise(function(resolve, reject) {
    emailAddress = Math.round(Math.random() * 600000000000) + "." + Math.round(Math.random() * 600000000000) + "@putyourdomainhere";
    var wordArray = [];
    var username = "";

    if (config["use-username-list"] == true) {
        wordArray = config["username-list"];
        username = generateUsername("", 3)
    } 

    if (config["random-username"] == true) {
        username = UsernameGenerator.generateUsername("", 11)
    }
    
    if (config["use-special-characters"] == true) {
        username = username.replaceAll("a", "а");
        username = username.replaceAll("c", "с");
        username = username.replaceAll("d", "ԁ");
        username = username.replaceAll("e", "е");
        username = username.replaceAll("i", "і");
        username = username.replaceAll("o", os[Math.round(Math.random() * os.length)]);
        username = username.replaceAll("p", "р");
        username = username.replaceAll("x", "х");
        username = username.replaceAll("u", "ս");
        username = username.replaceAll("y", "у");
    }

    const proxies = fs.readFileSync("./Modules/proxies.txt", 'utf-8');

    const proxyArr = proxies.split(/\r?\n/);
    var prox = proxyArr[Math.round(Math.random() * proxyArr.length)]
    var proxy = prox.split(":")[2] + ":" + prox.split(":")[3] + "@" + prox.split(":")[0] + ":" + prox.split(":")[1]

    var password = makeid(12) + "." + makeid(5) + "@";
    var email = emailAddress;

    const Captcha = require("2captcha");
    const solver = new Captcha.Solver(captchaKey);

    function makeid(length)
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(var i=0; i < length; i++)
        {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    var { SocksProxyAgent } = require("socks-proxy-agent");

    // A new 'solver' instance with our API key
    const { maxHeaderSize } = require("http");

    /* Example ReCaptcha Website */
    console.log("\x1b[33m", "[+] Using proxy - " + "http://" + proxy)
    // console.log("\x1b[33m", "[+] Not Using proxy.. Be sure to use a proxy for better mass generation!")
    console.log("\x1b[33m", "[+] Solving Captcha... This may take a minute...");
    solver.hcaptcha(config["site-key"], config.domain)
    .then((res) => {
        if (res.toString().includes("Bad gateway error:")) return this.runAsync(captchaKey);
        console.log("\x1b[32m", "[✔] Got Captcha - " + res.data.slice(-10));
        var payload = JSON.stringify({
            "username": username,
            "password": password,
            "email": email,
            "year": year,
            "month": month,
            "day": day,
            "captchaCode": res.data,
            "subscribe": true,
            "AcceptedTOSVersion": 8,
        });
        try {
        fetch("https://vrchat.com/api/1/auth/register?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26", {
        method: "POST",    
        agent: new HttpsProxyAgent("http://" + proxy),
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
            "Origin": "https://vrchat.com"
            },
            body: payload
        }).then(res => res.text()).then(async a => {
            var t = a;      
            console.log(t)
            if (a.includes("must be a valid email")) {
                interaction.editReply("Account generation failed.. Retrying...");
                this.runAsync(captchaKey);
                return console.log("\x1b[31m", "[✘] Account creation failed: (Reason) - Email must be a valid email address!");
            } 

            if (a.includes("<")) {
                this.runAsync(captchaKey);
                return;
            }
            a = JSON.parse(a);
            if (a.message == "username did not pass sanitization") {
                interaction.editReply("Account generation failed.. Retrying...");
                this.runAsync(captchaKey);
                return console.log("\x1b[31m", "[✘] Account creation failed: (Reason) - Username did not pass sanitization!");
            }
            if (a.message == "Username or email already exists!") {
                interaction.editReply("Account generation failed.. Retrying...");
                this.runAsync(captchaKey);
                return console.log("\x1b[31m", "[✘] Account creation failed: (Reason) - Username or email already exists!");
            }
            if (t.includes("email address is not allowed at")) {
                interaction.editReply("Account generation failed.. Retrying...");
                this.runAsync(captchaKey);
                return console.log("\x1b[31m", "[✘] Account creation failed: (Reason) - Domain Banned.. Retrying!");
            }
            var text = `Username: ${a.displayName} | [ Password: ${password} | Email: ${email} ] | UserID: ${a.id} [ AuthToken: ${a.authToken} ]`
            if (text.includes("undefined")) {
                this.runAsync(captchaKey);
            }
            console.log("\x1b[32m", text, "\x1b[31m");
            console.log("\x1b[32m", "[✔] Account Creation Success! Verifying Email...", "\x1b[31m");
            fs.appendFileSync("./GeneratedAccounts.txt", text + "\n");

            setTimeout(() => {
                var emailService = new EmailV();
                emailService.start(a.displayName, false).then(test => {
                        // fs.appendFile("../Modules/GeneratedAccounts.txt", text + "\n", () => {});
                        console.log("\x1b[32m", "[✔] Account Verification Success!", "\x1b[31m");
                        let embed = new EmbedBuilder()
                            .setDescription("`" + text + "`")
                            .setTitle("Account Generated")
                            .setColor("Green")
                            interaction.editReply("Account generated, check DMs!");
                        interaction.user.send({embeds: [embed]});
                    });
            }, 7000);
            })
            } catch (err) {

            }
        })
        })
    }
}

module.exports = VRWorker;