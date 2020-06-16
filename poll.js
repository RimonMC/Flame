const { RichEmbed } = require("discord.js");
const Discord = require('discord.js')
module.exports = {
    name: "poll",
    description: "Poll Message",
    category: "info",
    run: async (message, args, client, tools) => {

        if (message.member.hasPermission("ADMINISTRATOR")) {

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                const embed3 = new Discord.RichEmbed()
                .setColor("F17F27")
                .setFooter('FlameBot')
                .setTitle('Permission')
                .setDescription("I don't have the specific permission **ADMINISTRATOR**.")
    
                return message.channel.send(embed3)
            }}

        const embed = new Discord.RichEmbed()
        .setColor('#F17F27')
        .setTitle('Poll System')
        .addField('Usage:', "#poll Question")


        if (!args[0]) return message.channel.send(embed)

        const embed2 = new Discord.RichEmbed()
        .setColor('#F17F27')
        .setTitle('Poll')
        .setFooter('React with your choice | FlameBot')
        .setDescription(args.join(' '))

        let msg = await message.channel.send(embed2);

        await msg.react('🅰')
        await msg.react('🅱️')

        message.delete({timeout: 1000})
        



    }}