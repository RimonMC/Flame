const Discord = require('discord.js');

module.exports = {
    name: "invite",
    description: "Invite Command",
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
        .setFooter('Bot Invitation')
        .setDescription("**If you wish FlameBot in your discord click the following link: bot.rhip.xyz**")
        .setTitle("Invitation Link");

        let msg = await message.channel.send(embed);

}}