const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { formatDate } = require("../utils.js");

module.exports = {
    name: "serverinfo",
    description: "view information about current server",
    run: async (message, args) => {

        const server = message.guild;

        if (!server.me.hasPermission("EMBED_LINKS")) {
            const embed2 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('No Permission')
            .setDescription("I don't have the specific permission **EMBED_LINKS**.")
            return message.channel.send(embed2)
        }

        const created = formatDate(server.createdAt);

        let color;

        if (message.member.displayHexColor == "#000000") {
            color = "#F17F27";
        } else {
            color = message.member.displayHexColor;
        }

        const embed = new RichEmbed()
            .setThumbnail(server.iconURL)
            .setColor(color)
            .setTitle("» Server Info")
            
            .addField("» General Information", stripIndents `**» Owner:** ${server.owner.user.tag}

            **» Name:** ${server.name}
            **» Created:** ${created}
            **» Region:** ${server.region}

            **» Channels:** ${server.channels.size}
            **» Roles:** ${server.roles.size}
            **» Members:** ${server.memberCount}

            **» ID:** ${server.id}`)

            .setFooter(message.member.user.tag + " | » FlameBot", message.member.user.avatarURL)
            .setTimestamp();

        message.channel.send(embed).catch(() => {
            const embed4 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('No Permission')
            .setDescription("I don't have the specific permission **EMBED_LINKS**.")
            return message.channel.send(embed4)
        });
    }
};