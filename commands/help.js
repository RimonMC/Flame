const Discord = require('discord.js');
const { RichEmbed } = require("discord.js")


module.exports = {
    name: "help",
    description: "Help Message",
    category: "info",
    run: async (message, args) => {
        console.log("a")

        if (!message.member.hasPermission("EMBED_LINKS")) {
            const embed2 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **EMBED_LINKS**.")

            return message.channel.send(embed2)
        }


        ;
        const embed = new Discord.RichEmbed()
        .setColor('#F17F27')
        .setFooter('All FlameBot Commands')
        .addField('#help', "» Pulls this help command.", true)

        .addField('#announce', "» Embed Announcement.", true)

        .addField('#avatar / #av', "» Shows a user's Avatar.", true)

        .addField('#ban', "» Ban a user.", true)

        .addField('#embed', "» Embed Message by your choice.", true)

        .addField('#kick', "» Kick a user.", true)

        .addField('#poll', "» Create a simple poll, reacts with A & B as choices.", true)

        .addField('#purge', "» Purges the chat.", true)

        .addField('#serverinfo', "» Shows the server information.", true)

        .addField('#minecraft // #mc', "» Minecraft account.", true)

        .addField('#snipe', "» Snipe's the recent deleted message.", true)

        .addField('#Invite', "» Sends an invite link to the bot.", true)

        .addField('#skin', "» Show's the skin of a minecraft player.", true)

        .addField('#github', "» Show's the code of the discord bot.", true)

        .addField('#mcserver // server', "» Show's a minecraft server status.", true)

        .setTitle("FlameBot Help");

        let msg = await message.channel.send(embed);

}}