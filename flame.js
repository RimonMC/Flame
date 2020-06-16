const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require("./config.json");
const config = require("./config.json");
const Util = require('discord.js');
const queue = new Map();
const PREFIX = config.prefix;
client.muted = require('./muted.json');
const ms = require("ms")

client.login(token);
const fs = require("fs");

commands = new Discord.Collection();
var aliases = new Discord.Collection();
const snipe = new Map()

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

console.log(" Commands \n");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    commands.set(command.name, command);

    console.log("» " +command.name + " | Loaded");
}
console.log("\n Commands ");

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: "Flame's Servers" ,  //The message shown
            type: "watching" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
});

    aliases.set("av", "avatar");
    aliases.set("info", "serverinfo");
    aliases.set("ig", "instagram");
    aliases.set("mc", "minecraft");
    aliases.set ("inv", "invite");

    console.log("\n\n- - -");
    console.log('FlameBot is online..\n\n');

client.on("message", message => {

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.substring(prefix.length).split(" ");
    let cmd = args[0].toLowerCase();

    if (aliases.get(cmd)) {
        logCommand(message, args);
        return runCommand(aliases.get(cmd), message, args);
    }

    if (commands.get(cmd)) {
        logCommand(message, args);
        return runCommand(cmd, message, args);
    
}});

client.login(token);

function logCommand(message, args) {
    args.shift();
    console.log(message.member.user.tag + " ran command '" + message.content.split(" ")[0] + "'" + " with args: '" + args.join(" ") + "'");
}

function runCommand(cmd, message, args) {
    commands.get(cmd).run(message, args);

}
client.on("messageDelete", message => {

    if (!message) return

    if (!message.member) return

    if (message.content != "" && !message.member.user.bot && message.content.length > 1) {
        snipe.set(message.channel.id, message)

        exports.snipe = snipe
    }
})
exports.snipe

// Credits to Tekoh for all da help XD ily babe
