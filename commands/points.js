const Discord = require('discord.js');

module.exports = {
    name: "points",
    description: "Points Message",
    category: "info",
    run: async (message, args) => {
        console.log("a")

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const embed2 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **MANAGE_MESSAGES**.")

            return message.channel.send(embed2)
        }


        ;
        const embed = new Discord.RichEmbed()
        .setColor('#F17F27')
        .setFooter('Points System')
        .setDescription(args.join(" "))
        .setTitle("POINTS");

        let msg = await message.channel.send(embed);

}}