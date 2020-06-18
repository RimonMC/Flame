const { RichEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {
    name: "kick",
    description: "generic kick command",
    category: "moderation",
    run: async (message, args) => {
        console.log("a")

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return;
        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            const embed3 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **KICK_MEMBERS**.")

            return message.channel.send(embed3)
        }

        if (message.mentions.members.first() == null) {

            const embed2 = new Discord.RichEmbed()
            .setColor('#F17F27')
            .setFooter('FlameBot')
            .setTitle("Kick System")
            .addField("Usage:", "#kick <@user> <time>")

            message.channel.send(embed2);

            return;
        }

        const members = message.mentions.members
        let reason = message.member.user.tag + " | | "

        if (args.length != members.size) {
            for (let i = 0; i < members.size; i++) {
                args.shift()
            }
            reason = reason + args.join(" ")
        } else {
            reason = reason + "no reason specified"
        }

        let count = 0
        let failed = []

        for (member of members.keyArray()) {
            await members.get(member).kick(reason).then(() => {
                count++
            }).catch(() => {
                failed.push(members.get(member).user.tag)
            })
        }

        let color;

        if (message.member.displayHexColor == "#000000") {
            color = "#F17F27";
        } else {
            color = message.member.displayHexColor;
        }

        const embed = new Discord.RichEmbed()
            .setTitle("kick")
            .setDescription("**" + count + "** member(s) kicked for: " + reason.split("| | ")[1])
            .setColor(color)
            .setFooter(message.member.user.tag + " | FlameBot")

        if (failed.length != 0) {
            embed.addField("error", "unable to kick: " + failed.join(", "))
        }
        
        return message.channel.send(embed)

    }
}