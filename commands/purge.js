var cooldown = new Map();
const Discord = require("discord.js")
const { RichEmbed } = require('discord.js')
module.exports = {
    name: "purge",
    description: "delete the messages",
    category: "moderation",
    run: async (message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const embed = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **MANAGE_MESSAGES**.")

            return message.channel.send(embed)
        } 

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            const embed2 = new Discord.RichEmbed()
            .setColor("F17F27")
            .setFooter('FlameBot')
            .setTitle('Permission')
            .setDescription("I don't have the specific permission **MANAGE_MESSAGES**.")

            return message.channel.send(embed2)
        }

        if (cooldown.has(message.member.id)) {
            const init = cooldown.get(message.member.id)
            const curr = new Date()
            const diff = Math.round((curr - init) / 1000)
            const time = 20 - diff

            const minutes = Math.floor(time / 60)
            const seconds = time - minutes * 60

            let remaining

            if (minutes != 0) {
                remaining = `${minutes}m${seconds}s`
            } else {
                remaining = `${seconds}s`
            }
            return message.channel.send("ON COOLDOWN for " + remaining );
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send(".purge <amount>");
        }

        let amount = (parseInt(args[0]) + 1);

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            amount = 15;
            cooldown.set(message.member.id, new Date());

        setTimeout(() => {
            cooldown.delete(message.member.id);
        }, 20000);
        }

        if (amount <= 100) {
            message.channel.bulkDelete(amount).then( () => {
                message.channel.send("**Purged " + args[0] + " messages**").then(m => m.delete(2500));
            }).catch();
        } else {
            let amount1 = Math.round(amount / 100);

            if (amount1 > 10) {
                amount1 = 10;
            }

            for (var i = 0; i < amount1; i++) {
                if (amount < 100) {
                    message.channel.bulkDelete(amount).then( () => {
                        message.channel.send("**Purged " + args[0] + " messages**").then(m => m.delete(10000));
                    });
                }
                message.channel.bulkDelete(100);
                amount -= 100;
            }

        }
    }
};