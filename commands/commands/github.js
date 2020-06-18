const Discord = require('discord.js');

module.exports = {
    name: "github",
    description: "Github Message",
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
        .setFooter('FlameBot Code')
        .setDescription("https://github.rhip.xyz")
        .setTitle("FlameBot Github");

        let msg = await message.channel.send(embed);

}}