const { MessageEmbed } = require("discord.js");
const log = require('../../database/action')
const messages = require('../../database/messages')
module.exports = {
    name: "log",
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "Unable to run that command: \nThe log command requires you to have ManageGuild permission."})
        const help = new MessageEmbed()
        .setTitle("Log Help")
        .setDescription("Configure how you want stuff to be logged. \n Example: `s.log members #member-scam-logs` \n Categories: \n`members` - Logs whenever a user posts a scam/phishing link \n `messages` - Logs whenever a message is edited/deleted/bulkdeleted")
        if(!args[0]) return message.channel.send({embeds: [help]})
        const what = args[0]
        const c = what.toLowerCase()
        if(c === "members") {
            const channel = message.mentions.channels.first()
            if(!channel) return message.channel.send({content: "You did not provide a channel as an argument."})
            log.findOne({guildID: message.guild.id}, async(err, data) => {
            if(data) {
                data.channelID = channel.id
                await data.save()
            } else {
                new log({guildID: message.guild.id, channelID: channel.id, action: "none"}).save()
            }
        })
            return message.channel.send({content: `Now logging members in #${channel.name}`})
        } if(c === "messages") {
            const channel = message.mentions.channels.first()
            if(!channel) return message.channel.send({content: "You did not provide a channel as an argument."})
            messages.findOne({guildID: message.guild.id}, async(err, data) => {
                if(data) {
                    data.channelID = channel.id
                    await data.save()
                } else {
                    new messages({guildID: message.guild.id, channelID: channel.id}).save()
                }
            })
                return message.channel.send({content: `Now logging messages in #${channel.name}`})


        }
    }
}