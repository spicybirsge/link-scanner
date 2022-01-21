const actions = require('../../database/action') 
const prefix = require('../../database/prefixes')
const messages = require('../../database/messages')
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "settings",
    run: async (client, message, args) => {
        const s = new MessageEmbed()
        const d = await actions.findOne({guildID: message.guild.id})
        const p = await prefix.findOne({guildID: message.guild.id})
        const m = await messages.findOne({guildID: message.guild.id})
        s.setTitle(`Settings for ${message.guild.name}`)
        s.setColor("#db149f")
        if(p) {
            s.addField('Prefix:', p.prefix || "s.")
        } else {
            s.addField('Prefix:', "s.")

        }
        if(d) {
            s.addField('Member log channel ID:', d.channelID || "No Log Channel")
            s.addField('Action:', d.action || "None")
        } else {
            s.addField('Member log channel ID:', "No Log Channel")
            s.addField('Action:', "None")

        } 
        if(m) {
            s.addField('Message log channel ID:', m.channelID || "None")
        } else {

            s.addField('Message log channel ID:', "None")
        }
        message.channel.send({embeds: [s]})

        
    }

}