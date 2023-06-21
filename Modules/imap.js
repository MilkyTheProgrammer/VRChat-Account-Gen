const { resolve } = require('path');
const fetch = require("node-fetch");

var Imap = require('node-imap'),
    inspect = require('util').inspect;
    const simpleParser = require('mailparser').simpleParser;

    const request = require('request');

    var imap = new Imap({
        user: '',
        password: '',
        host: '',
        port: 993,
        tls: true
      });
    
class EmailV {
    constructor() {
        this.isVerified = false;
    }

    start(userName) {
        return new Promise((resolve, reject) => {
            function openInbox(cb) {
                imap.openBox('INBOX', true, cb);
            }
    
            function sendEmailVerify(link) {
                console.log("\x1b[32m", "[+] Link - " + link, "\x1b[31m");
                fetch(link, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                        "Origin": "https://vrchat.com"
                    }
                }).then(res => res.text()).then(a => {
                    if (a.includes("VR")) {
                        console.log("\x1b[32m", "[✔] Email Verified", "\x1b[31m");
                        imap.end();
                        resolve();
                    }
                });
            }
    
            imap.once('ready', function() {
                console.log("\x1b[32m", "[IMap] Ready! Looking for verification link to - " + userName, "\x1b[31m");
                openInbox(function(err, box) {
                    if (err) throw err;
                    imap.search(['UNSEEN', ['SINCE', `Mar 9, 2023`]], function(err, results) {
                        if (err) throw err;
                        var f = imap.fetch(results, {
                            bodies: ''
                        });
                        f.on('message', function(msg, seqno) {
                            msg.on('body', async function(stream, info) {
                                let parsed = await simpleParser(stream);
                                if (parsed.html.toString().includes(userName)) {
                                    var splited = parsed.html.toString().split('">Click here to confirm your e-mail address!</a>')[0];
                                    var verifyLink = splited.split('<a href="')[1];
                                    console.log("\x1b[32m", "[IMap] Found Verification Link!", "\x1b[31m");
                                    sendEmailVerify(verifyLink);
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
 
module.exports =  EmailV;