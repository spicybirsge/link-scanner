const client = require("../index");
const log = require('../database/messages')
const { MessageEmbed, MessageAttachment } = require("discord.js")
client.on("messageDeleteBulk", (messageDeleteBulk) => {
    const guild = messageDeleteBulk.first().guild
  const channel1 = messageDeleteBulk.first().channel
 
  log.findOne({ guildID: guild.id }, async (err, data) => { 
      if(!data) return; 
      const channel = client.channels.cache.get(data.channelID)
    if(!channel) return;
    const r = messageDeleteBulk.map(message => `[${message.author.tag}] - Content: ${message.content}`).toString().split(",").join("\n \n")
    const buffer = Buffer.from(r)
    const attachment = new MessageAttachment(buffer, "BulkDelete.txt")
    channel.send({content:`${messageDeleteBulk.size} Messages BulkDeleted in ${channel1}. I have attached the BulkDeleted messages in the file below.`,files: [attachment]})
  })
})