const {google} = require('googleapis');
const mailparser = require('mailparser');
const fetch = require("node-fetch");

class EmailV {
    constructor() {
        this.isVerified = false;
        this.gmailClient = null;
    }

    async start(userName) {
        // Load credentials
        const credentials = require('./credentials.json');
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        
        // Load access token
        const token = require('/path/to/gmail/token.json');
        oAuth2Client.setCredentials(token);
        
        // Create Gmail API client
        const gmailClient = google.gmail({version: 'v1', auth: oAuth2Client});
        this.gmailClient = gmailClient;
        
        // Search for verification email
        const emailSearchQuery = `in:inbox is:unread newer_than:1d subject:"Confirm your email address"`;
        const res = await gmailClient.users.messages.list({userId: 'me', q: emailSearchQuery});
        const messageIds = res.data.messages.map(message => message.id);
        
        // Process each message
        for (const messageId of messageIds) {
            const message = await gmailClient.users.messages.get({userId: 'me', id: messageId});
            const {data} = message.payload.parts[0].body;
            const email = await mailparser.simpleParser(data);
            if (email.html.includes(userName)) {
                const splited = email.html.split('">Click here to confirm your e-mail address!</a>')[0];
                const verifyLink = splited.split('<a href="')[1];
                console.log("[IMap] Found Verification Link!");
                await this.sendEmailVerify(verifyLink);
                break;
            }
        }
        
        // Disconnect
        this.gmailClient = null;
    }
    
    async sendEmailVerify(link) {
        console.log("[+] Link - " + link);
        const res = await fetch(link, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                "Origin": "https://vrchat.com"
            }
        });
        const text = await res.text();
        if (text.includes("VR")) {
            console.log("[✔] Email Verified");
        }
    }
}

module.exports = EmailV;