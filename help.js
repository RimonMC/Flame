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
        .addField('#help', "» Pulls this help command.")

        .addField('#announce', "» Embed Announcement.")

        .addField('#avatar / #av', "» Shows a user's Avatar.")

        .addField('#ban', "» Ban a user.")

        .addField('#embed', "» Embed Message by your choice.")

        .addField('#kick', "» Kick a user.")

        .addField('#poll', "» Create a simple poll, reacts with A & B as choices.")

        .addField('#purge', "» Purges the chat.")

        .addField('#serverinfo', "» Shows the server information.")

        .addField('#minecraft // #mc', "» Minecraft account.")

        .addField('#snipe', "» Snipe's the recent deleted message.")

        .addField('#Invite', "» Sends an invite link to the bot.")

        .setTitle("FlameBot Help");

        let msg = await message.channel.send(embed);

}}