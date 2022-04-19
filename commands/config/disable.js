const { MessageEmbed } = require("discord.js");
const log = require('../../database/action')
const messages = require('../../database/messages')
module.exports = {
    name: "disable",
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "Unable to run that command: \nThe disable command requires you to have ManageGuild permission."})
        const help = new MessageEmbed()
        .setTitle("Disable Help")
        .setDescription("Remove logging channels for your server. \nExample: `s.disable messages` \n Categories: \n `members` - disables member logging \n `messages` - disables message logging.")
        c = args[0]
        if(!c) {
            return message.channel.send({embeds: [help]})
        }
        if(c === "members") {
            log.findOne({guildID: message.guild.id}, async(err, data) => {
                if(data) {
                    data.channelID = null
                    await data.save()
                    return message.channel.send({content:"Member logging is now disabled."})
                } else {
                    return message.channel.send({content:"Member logging was never enabled in this server."})
                }
            })

        } else {
            if(c === "messages") {
                messages.findOne({guildID: message.guild.id}, async(err, data) => {
                    if(data) {
                        data.channelID = null
                        await data.save()
                        return message.channel.send({content:"Message logging is now disabled"})
                    } else {
                        return message.channel.send({content:"Message logging was never enabled in this server."})
                    }
                })
            } else {
                return message.channel.send({embeds:[help]})
            }
        } 

    }
}
