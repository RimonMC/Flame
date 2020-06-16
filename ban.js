const RichEmbed = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "Ban Command",
    run: async (message, args) => {
        
        if (message.member.hasPermission("BAN_MEMBERS")) {

            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                const embed3 = new Discord.RichEmbed()
                .setColor("F17F27")
                .setFooter('FlameBot')
                .setTitle('Permission')
                .setDescription("I don't have the specific permission **BAN_MEMBERS**.")
    
                return message.channel.send(embed3)
            }

            if (message.mentions.members.first() == null) {

                const embed2 = new Discord.RichEmbed()
                .setColor('#F17F27')
                .setFooter('FlameBot')
                .setTitle("Ban System")
                .addField("Usage:", "#ban <@user> <time>")

                message.channel.send(embed2);
                
                return;
            }
            let member = message.mentions.members.first();

            let reason;

            if (args.length == 1) {
                reason = "Provide a reason";
            } else {
                args.shift();
                reason = args.join(" ");
            }

            let banned = member.user.tag;

            member.ban({
                reason: ("moderator: " + message.member.user.tag + " | | | reason: " + reason)
            }).then((member) => {
                console.log(banned + " was banned by " + message.member.user.tag + " for: " + reason);

                const embed = new Discord.RichEmbed()
                .setColor('#F17F27')
                .setFooter('FlameBot')
                .setTitle("User Banned | "+ banned +"")
                .setDescription("**Reason Banned** | "  + args.join("** **"))
                

                message.channel.send(embed);
            });
        } else {
            message.channel.send("No permission.");
        }

    }
};