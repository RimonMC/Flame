const { RichEmbed } = require("discord.js")
const fetch = require("node-fetch")
const Discord = require('discord.js')

const cooldown = new Map()

module.exports = {
    name: "skin",
    description: "view the skin of a minecraft account",
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

        if (args.length == 0) {
            const embed3 = new Discord.RichEmbed()
            .setColor('#F17F27')
            .setFooter('FlameBot')
            .setTitle("Skin System")
            .addField("Usage:", "#skin <IGN>")

            message.channel.send(embed3);
        }

        if (cooldown.has(message.member.id)) {
            const init = cooldown.get(message.member.id)
            const curr = new Date()
            const diff = Math.round((curr - init) / 1000)
            const time = 10 - diff

            const minutes = Math.floor(time / 60)
            const seconds = time - minutes * 60

            let remaining

            if (minutes != 0) {
                remaining = `${minutes}m${seconds}s`
            } else {
                remaining = `${seconds}s`
            }
            const embed4 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Cooldown')
            .setDescription("Currently on cooldown for " + remaining + "")

            return message.channel.send(embed4)
        }

        cooldown.set(message.member.id, new Date());

        setTimeout(() => {
            cooldown.delete(message.member.id);
        }, 10000);

        const username = args[0]

        const uuidURL = "https://api.mojang.com/users/profiles/minecraft/" + username
        let uuid

        try {
            uuid = await fetch(uuidURL).then(uuidURL => uuidURL.json())
        } catch (e) {
            const embed5 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Account')
            .setDescription("Please specify an account.")

            return message.channel.send(embed5)
        }

        const skinIMG = `https://visage.surgeplay.com/full/${uuid.id}.png`


        const embed = new RichEmbed()
            .setTitle(uuid.name)
            .setURL("https://namemc.com/profile/" + username)
            .setDescription(`[Click here to download](https://mc-heads.net/download/${uuid.id})`)
            .setColor("F17F27")
            .setImage(skinIMG)
            .setFooter("FlameBot")
        
        return message.channel.send(embed).catch(() => {
            const embed8 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **EMBED_LINKS**.")

            return message.channel.send(embed8)
        })

    }
}