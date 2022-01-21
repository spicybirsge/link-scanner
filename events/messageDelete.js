const client = require("../index");
const log = require('../database/messages')
const { MessageEmbed } = require("discord.js")
client.on('messageDelete', async  (message) => {
    if(message.channel.type === "DM") return;
    if(message.author.bot) return;

log.findOne({guildID: message.guild.id}, async (err , data) => {
    if(!data) return;
    const channel = client.channels.cache.get(data.channelID)
    if(!channel) return;
    const deleted = new MessageEmbed()
    .setAuthor({ name: 'Message Deleted', iconURL: message.author.avatarURL() })
    .setDescription(`Author: ${message.author.tag} \nUser ID: ${message.author.id} \nChannel: #${message.channel.name} \nDeleted Message: ${message.content || "NO_CONTENT_AVAILABLE"}`)
    .setColor("RED")
    if(message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
            const url = attachment.url;
            deleted.setImage(url)
        })
    }
    channel.send({embeds: [deleted]})
})
})