const { resolve } = require('path');
const fetch = require("node-fetch")
var Imap = require('node-imap'),
    inspect = require('util').inspect;
    const simpleParser = require('mailparser').simpleParser;
const {EmbedBuilder} = require("discord.js")
var imap = new Imap({
    user: '',
    password: '',
    host: '',
    port: 993,
    tls: true
  });


class EmailG {
    constructor() {
        this.isVerified = false;
    }

    start(userName, interaction) {
        return new Promise((resolve, reject) => {
            function openInbox(cb) {
                imap.openBox('INBOX', true, cb);
            }

            function verifyLogin(link, interaction) {
                console.log("\x1b[32m", "[+] Link - " + link, "\x1b[31m");
                fetch(link, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                        "Origin": "https://vrchat.com"
                    }
                }).then(res => res.text()).then(a => {
                    console.log(a)
                    if (a.includes("Login Verified")) {
                        console.log("\x1b[32m", "[✔] Login Verified", "\x1b[31m");
                        imap.end();
                        let embed = new EmbedBuilder()
                        .setDescription("`Your login was verified!`")
                        .setTitle("Login Location")
                        .setColor("Green")
                    interaction.editReply("Login verified!");
                    interaction.user.send({embeds: [embed]});
                    } else {
                        console.log("\x1b[32m", "[✔] Login Verified", "\x1b[31m");
                        imap.end();
                        let embed = new EmbedBuilder()
                        .setDescription("`Your login was verified!`")
                        .setTitle("Login Location")
                        .setColor("Green")
                    interaction.editReply("Login verified!");
                    interaction.user.send({embeds: [embed]});
                    }
                });
            }
    
            imap.once('ready', function() {
                console.log("\x1b[32m", "[IMap] Ready! Looking for one time code to - " + userName, "\x1b[31m");
                openInbox(function(err, box) {
                    if (err) throw err;
                    imap.search(['UNSEEN', ['SINCE', `Mar 8, 2023`]], function(err, results) {
                        if (err) throw err;
                        var f = imap.fetch(results, {
                            bodies: ''
                        });
                        f.on('message', function(msg, seqno) {
                            msg.on('body', async function(stream, info) {
                                let parsed = await simpleParser(stream);
                                console.log(parsed.html)
                                if (parsed.html.includes(userName) && parsed.html.includes('">Yep, that was me logging in from')) {
                                    var splited = parsed.html.split('">Yep, that was me logging')[0];
                                    console.log(splited)
                                    var splitted2 = splited.split(`href="`)[1];
                                    console.log(splitted2)
                                    console.log("\x1b[32m", "[IMap] Found Login!", "\x1b[31m");
                                    verifyLogin(splitted2, interaction);
                                }
                            });
                        });
                        f.once('error', function(err) {
                            console.log('Fetch error: ' + err);
                        });
                        f.once('end', function() {
                            imap.end();
                        });
                    });
                });
            });
    
            imap.once('error', function(err) {
                console.log(err);
            });
    
            imap.once('end', function() {
            });
    
            imap.connect();
        });
    }
}
 
module.exports =  EmailG;