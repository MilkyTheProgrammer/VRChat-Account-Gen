const { resolve } = require('path');

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
class EmailF {
    constructor() {
        this.isVerified = false;
    }

    start(userName, interaction) {
        return new Promise((resolve, reject) => {
            function openInbox(cb) {
                imap.openBox('INBOX', true, cb);
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
                                if (parsed.html.includes(userName) && parsed.html.toLowerCase().includes("one-time")) {
                                    var splited = parsed.html.split("Here's your one-time code: ")[1];
                                    var splitted2 = splited.split(`">`)[0];
                                    var splitted3 = splitted2.split(`</b>`)[0];
                                    var splitted4 = splitted3.split(`<b>`)[1];
                                    console.log("\x1b[32m", "[IMap] Found One Time Code!", "\x1b[31m");

                                    let embed = new EmbedBuilder()
                                        .setDescription("Here's your one-time code: `" + splitted4 + "`")
                                        .setTitle("2Auth Code")
                                        .setColor("Green")
                                    interaction.editReply("Found One Time Code, check DMs!");
                                    interaction.user.send({embeds: [embed]});
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
 
module.exports =  EmailF;