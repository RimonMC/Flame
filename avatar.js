const { RichEmbed } = require("discord.js");
const { getMember } = require("../utils");

module.exports = {
    name: "avatar",
    description: "An Avatar",
    category: "info",
    run: async (message, args) => {

        if (!message.guild.me.hasPermission("EMBED_LINKS")) {
            const embed2 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **EMBED_LINKS**.")

            return message.channel.send(embed2)
        }

        let member;

        if (args.length == 0) {
            member = message.member;
        } else {
            if (!message.mentions.members.first()) {
                member = getMember(message, args[0]);
            } else {
                member = message.mentions.members.first();
            }
        }

        if (!member) {
            return message.channel.send("Please specify a user.");
        }

        let color;

        if (member.displayHexColor == "#000000") {
            color = "#F17F27";
        } else {
            color = member.displayHexColor;
        }

        const embed = new RichEmbed()
            .setTitle(member.user.tag)
            .setColor(color)
            .setImage(member.user.avatarURL)

            .setFooter(message.member.user.tag + " | FlameBot", message.member.user.avatarURL)
            .setTimestamp();

        message.channel.send(embed).catch(() => {
            return message.channel.send("Invalid User: 'EMBED_LINKS'");
        });

    }
};