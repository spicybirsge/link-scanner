const client = require("../index");
const log = require('../database/messages')
const { MessageEmbed } = require("discord.js")
client.on('messageUpdate', async  (oldmessage, message) => {

   if(message.channel.type === "DM") return;
    if(message.author.bot) return;
if(oldmessage.content === message.content) return;
log.findOne({guildID: message.guild.id}, async (err , data) => {
    if(!data) return;
    const channel = client.channels.cache.get(data.channelID)
    if(!channel) return;
    const updated = new MessageEmbed()
    .setAuthor({ name: 'Message Updated', iconURL: message.author.avatarURL() })
    .setDescription(`Author: ${message.author.tag} \nUser ID: ${message.author.id} \nChannel: #${message.channel.name} \nOld Message: ${oldmessage.content || "NO_CONTENT_AVAILABLE"} \nNew Message: ${message.content || "NO_CONTENT_AVAILABLE"}`)
    .setColor("YELLOW")
    if(message.attachments.size > 0) {
    message.attachments.forEach(attachment => {
        const url = attachment.url;
        updated.setImage(url)
    })
}
    channel.send({embeds: [updated]})
})
})