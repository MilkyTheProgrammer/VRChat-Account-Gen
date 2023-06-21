const Discord = require("discord.js");
const vrchat = require("vrchat-client");
const fs = require("fs");
const sendFriendRequest = require("./VRChat-Friend-Botter/test2");
const FRWorker = require("./VRChat-Friend-Botter/test2");
const VRWorker = require("./Modules/gen");
const complexVRWorker = require("./Modules/complexgen")
const crypto = require('crypto');

const bot = new Discord.Client({
  intents: ["Guilds", "GuildMembers"],
  disableMentions: "true"
});

const {
  SlashCommandBuilder
} = require('@discordjs/builders');
const EmailF = require("./Modules/2auth");
const EmailG = require("./Modules/loginlocation");
var lastsentinteraction = null;

// Inside your client's ready event
bot.on('ready', () => {
  const accountCommand = new SlashCommandBuilder()
    .setName('account')
    .setDescription('Generate a new VRChat account');

  const helpCommand = new SlashCommandBuilder()
    .setName('help')
    .setDescription('List commands for vanish bot');

  const whitelistCommand = new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Add a user to the whitelist')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user to add to the whitelist')
      .setRequired(true));

  const blacklistCommand = new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('Remove a user from the whitelist')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user to remove from the whitelist')
      .setRequired(true));

  const resetHWIDCommand = new SlashCommandBuilder()
    .setName('reset-hwid')
    .setDescription('Input your license key to reset it')
    .addStringOption(option =>
      option.setName('key')
      .setDescription('Input your license key to reset it')
      .setRequired(true));

  const resetKeyCommand = new SlashCommandBuilder()
    .setName('reset-key')
    .setDescription("Resets a user's key")
    .addMentionableOption(option =>
      option.setName('user')
      .setDescription('Input the user to reset key')
      .setRequired(true));

  const twoAuthCommand = new SlashCommandBuilder()
    .setName('2auth')
    .setDescription('Input username to get one time code')
    .addStringOption(option =>
      option.setName('username')
      .setDescription('Input username to get one time code')
      .setRequired(true));

  const loginLocationCommand = new SlashCommandBuilder()
    .setName('loginlocation')
    .setDescription('Set the login location for new accounts')
    .addStringOption(option =>
      option.setName('username')
      .setDescription('The login location to set')
      .setRequired(true));

 

  const commands = bot.application.commands;
  if (commands) {
    commands.create(accountCommand)


    commands.create(resetHWIDCommand)


    commands.create(whitelistCommand)


    commands.create(blacklistCommand)
  

    commands.create(twoAuthCommand)
    

    commands.create(loginLocationCommand)
  

    commands.create(helpCommand)
      

    commands.create(resetKeyCommand)
    
  }
});

function isStringContainedInObject(obj, key, value) {
  var objString = JSON.stringify(obj);
  return objString.search(key + ":" + value) >= 0;
}

const admins = [""];

var workers = [];

async function start() {

  bot.on("ready", () => {
    console.log("Ready!");
  });

  setInterval(() => {
    bot.user.setActivity("Watching the souls...");
  }, 2000);

  var prefix = ">";

  bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    lastsentinteraction = interaction;
    var userDB = require("./userDB.json");
    if (!userDB[interaction.user.id]) {
      const today = new Date();
      userDB[interaction.user.id] = {
        accountsGenerated: 0,
        day: today.getDate()
      }
    }

    const {
      commandName
    } = interaction;

    if (commandName === "help") {
      const member = interaction.member;
      const roleID = "1117263428315271298";
      if (member.roles.cache.find(role => role.id === roleID)) {

        const helpEmbed = new Discord.EmbedBuilder()
          .setTitle("Here are my commands:")
          .addField("/account", "Generate a VRChat account")
          .addField("/2auth <username>", "Get one time code for account")
          .addField("/loginlocation <username>", "Verifies the login location for account")
          .addField("/gen-key <user>", "Remove a user from the whitelist (owner only)")
          .addField("/reset-key <user>", "Resets a user's key (owner only)")
          .addField("/reset-hwid <key>", "Resets your key (vanish client users only)")

          .setColor("Green");
        interaction.reply({
          embeds: [helpEmbed]
        });
      };
    }

    if (commandName === "reset-key") {
      if (!admins.includes(interaction.user.id)) return interaction.reply("You don't have permission to use this command");
      const keyDB = require("../keysys/userdb.json");
      const input = interaction.options.getMember('user');
      var keyFound = false;
      var canContinue = true;


      for (i = 0; i < keyDB.length; i++) {
        if (keyDB[i].userID == interaction.user.id) {
          const index = keyDB.findIndex(obj => obj.userID === input.id);
          const key = "Vanish-" + crypto.randomBytes(4).toString('hex') + "-" + crypto.randomBytes(4).toString('hex') + "-" + crypto.randomBytes(4).toString('hex') + "-" + crypto.randomBytes(4).toString('hex');

          var tmp = {};

          if (index !== -1) {
            // create the new object
            if (keyDB[index].hwid) {
              tmp = {
                "key": key,
                "userID": keyDB[index].userID,
                "hwid": keyDB[index].hwid
              };
            } else {
              tmp = {
                "key": key,
                "userID": keyDB[index].userID
              };
            }

            // replace the old object with the new one
            keyDB.splice(index, 1, tmp);

            // write the updated array to file
            fs.writeFile("../keysys/userdb.json", JSON.stringify(keyDB), () => {});
            const guild = bot.guilds.cache.get('1077745143010041876');
            const m = guild.members.cache.find(member => member.id === input.id);
            let embed = new EmbedBuilder()
            embed.setTitle("Your new Vanish Client key is")
            embed.setColor('Purple')
            embed.addFields({
              name: 'New License Key',
              value: "`" + key + "`",
              inline: true
            });
            embed.setDescription("**DO NOT** share this key or it will be revoked. Take care!");
            // Add the role to the member
            m.send({
              embeds: [embed]
            })
            interaction.reply("Key Reset Successfully!");
            keyFound = true;
          }
        } else {
          if (canContinue) {
            keyFound = false;
            canContinue = false;
          }
        }
      }

      if (!keyFound) return interaction.reply("Either you dont own a key or this key is not valid, or this key isn't yours. Contact ! Phoenix for support!");
    }

    if (commandName === "reset-hwid") {
      const keyDB = require("../keysys/userdb.json");
      const input = interaction.options.getString('key');
      var keyFound = false;
      var canContinue = true;

      for (i = 0; i < keyDB.length; i++) {
        if (keyDB[i].key == input && keyDB[i].userID == interaction.user.id) {
          let tmpKey = keyDB[i].key;
          let userID = keyDB[i].userID;

          delete keyDB[i];

          var tmp = {
            key: tmpKey,
            userID
          };

          keyDB.push(tmp);
          // write the updated array to file
          fs.writeFile("../keysys/userdb.json", JSON.stringify(keyDB), () => {});
          interaction.reply("HWID Reset Successfully!");
          keyFound = true;
        }
      }
      if (!keyFound) return interaction.reply("Either you dont own a key or this key is not valid, or this key isn't yours. Contact ! Phoenix for support!");
    }

    if (commandName === "2auth") {
      const member = interaction.member;
      const roleID = "1117263428315271298";
      if (member.roles.cache.find(role => role.id === roleID)) {
        const input = interaction.options.getString('username');
        new EmailF().start(input, interaction);
        interaction.reply("Looking for 2auth code...");
      }
    }

    if (commandName === "loginlocation") {
      const member = interaction.member;
      const roleID = "1117263428315271298";
      if (member.roles.cache.find(role => role.id === roleID)) {

        const input = interaction.options.getString('username');
        new EmailG().start(input, interaction);
        interaction.reply("Looking for Login Verification...");
      }
    }

    if (commandName === "account") {
      const member = interaction.member;
      const roleID = "1117263428315271298";
      if (member.roles.cache.find(role => role.id === roleID)) {

        const today = new Date();
        const day = today.getDate();
        var tmp = require("./userDB.json");
        if (tmp[interaction.user.id].accountsGenerated == 3 && tmp[interaction.user.id].day == day) {
          interaction.reply("You've reached your daily limit of account generating! Check back later!");
          return;
        }

        new VRWorker().runAsync("", interaction);
        interaction.reply("Generating account, this may take a minute due to 2captcha...");
        if (tmp["523270290059427862"]) return;
        tmp[interaction.user.id].accountsGenerated += 1;
        tmp[interaction.user.id].day = day;
        fs.writeFile("./userDB.json", JSON.stringify(tmp), () => {});
      }
    }


    if (commandName === "whitelist") {
      const roleID = "1113322903174385674";
      const input = interaction.options.getMember('user');
      if (input.roles.find(role => role.id === roleID)) {
        fs.appendFile("./whitelist.txt", input.id + "\n", () => {});
        interaction.reply(`${input.displayName} was added to the whitelist`);
      }
    }

    if (commandName == "blacklist") {
      const roleID = "1113322903174385674"; // the name of the role you want to check for
      const input = interaction.options.getMember('user');

      if (input.roles.find(role => role.id === roleID)) {
        fs.readFile("./whitelist.txt", (err, data) => {
          if (!data.toString().includes(input.id)) return interaction.reply("User not found in whitelist!");
          data.toString().replace(input.id, "").trim();
          fs.writeFile("./whitelist.txt", data, () => {});
          interaction.reply(`${input.displayName} was removed from the whitelist`);
        });
      }
    }
  })
}

start();

bot.login("");