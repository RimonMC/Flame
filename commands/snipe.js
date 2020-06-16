const { RichEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "snipe",
    description: "snipe the most recently deleted message",
    category: "fun",
    run: async (message, args) => {
        const { snipe } = require("../flame.js")

        let channel = message.channel.id

        if (args.length == 1) {
            if (!message.mentions.channels.first()) {
                const embed5 = new Discord.RichEmbed()
                .setColor("F17F27")
                .setFooter('FlameBot')
                .setTitle('Snipe')
                .setDescription("Please specify a channel.")
    
                return message.channel.send(embed5)
            }
            channel = message.mentions.channels.first().id
            if (!channel) {

                const embed4 = new Discord.RichEmbed()
                .setColor("F17F27")
                .setFooter('FlameBot')
                .setTitle('Snipe')
                .setDescription("Please specify a channel.")
    
                return message.channel.send(embed4)
            }
        }

        if (!snipe || !snipe.get(channel)) {

            const embed2 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Snipe')
            .setDescription("There's nothing to snipe.")

            return message.channel.send(embed2)
        }

        let content = snipe.get(channel).content

        if (content) {
            if (snipe.get(channel).attachments.url) {
                content = snipe.get(channel).attachments.url
            }
        }

        const created = new Date(snipe.get(channel).createdTimestamp)


        const embed = new RichEmbed()
            .setColor("F17F27")
            .setTitle(snipe.get(channel).member.user.tag)
            .setDescription(content)

            .setFooter(timeSince(created) + " ago")
        
        message.channel.send(embed)

    }
}

function timeSince(date) {

    const ms = Math.floor((new Date() - date));

    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    const daysms = ms % (24 * 60 * 60 * 1000)
    const hours = Math.floor((daysms) / (60*60*1000))
    const hoursms = ms % (60 * 60 * 1000)
    const minutes = Math.floor((hoursms) / (60 * 1000))
    const minutesms = ms % (60 * 1000)
    const sec = Math.floor((minutesms) / (1000))

    let output = ""

    if (days > 0) {
        output = output + days + "d "
    }

    if (hours > 0) {
        output = output + hours + "h "
    }

    if (minutes > 0) {
        output = output + minutes + "m "
    }

    if (sec > 0) {
        output = output + sec + "s"
    }

    return output
  }