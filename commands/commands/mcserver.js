const { RichEmbed, MessageAttachment } = require("discord.js")
const fetch = require("node-fetch")

const cooldown = new Map()
const cache = new Map()

module.exports = {
    name: "mcserver",
    description: "view information about a minecraft server",
    category: "info",
    run: async (message, args) => {
        if (!message.guild.me.hasPermission("EMBED_LINKS")) {
            const embed4 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **EMBED_LINKS**.")

            return message.channel.send(embed4)
        }

        if (args.length == 0) {
            const embed2 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Server System')
            .addField('Usage:', "» #mcserver // #mcserver <IP>.")

            return message.channel.send(embed2);
        }

        if (cooldown.has(message.member.id)) {
            const init = cooldown.get(message.member.id)
            const curr = new Date()
            const diff = Math.round((curr - init) / 1000)
            const time = 5 - diff

            const minutes = Math.floor(time / 60)
            const seconds = time - minutes * 60

            let remaining

            if (minutes != 0) {
                remaining = `${minutes}m${seconds}s`
            } else {
                remaining = `${seconds}s`
            }
            const embed3 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Cooldown')
            .setDescription("Currently on cooldown for " + remaining + "")

            return message.channel.send(embed3)
        }

        cooldown.set(message.member.id, new Date());

        setTimeout(() => {
            cooldown.delete(message.member.id);
        }, 5000);

        if (!args[0].includes(".")) {
            const embed5 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Server IP')
            .setDescription("Please specify a Server IP.")

            return message.channel.send(embed5)
        }

        const serverIP = args[0]
        const url = "https://api.mcsrvstat.us/2/" + serverIP.toLowerCase()
        let res
        let invalid = false

        if (cache.has(serverIP.toLowerCase())) {
            res = cache.get(serverIP.toLowerCase())
        } else {
            res = await fetch(url).then(url => url.json()).catch(() => {
                invalid = true
            })
            if (!invalid) {
                cache.set(serverIP.toLowerCase(), res)
                setTimeout(() => {
                    cache.delete(serverIP.toLowerCase())
                }, 600000)
            } else {
                const embed6 = new Discord.RichEmbed()
                .setColor("F17F27")
                .setFooter('FlameBot')
                .setTitle('Server IP')
                .setDescription("Please specify a Server IP.")
    
                return message.channel.send(embed6)
            }
        }


        const embed = new RichEmbed()
            .setTitle(args[0])
            .addField("IP", res.ip)
            .addField("Port", res.port)
            .addField("Players", res.players.online.toLocaleString() + "/" + res.players.max.toLocaleString(), true)
            .addField("Version", res.version, true)
            .addField("Motd", res.motd.clean)
            .setColor("#F17F27")
            .setFooter("FlameBot | bot.rhip.xyz")

        return message.channel.send(embed)
    }
}