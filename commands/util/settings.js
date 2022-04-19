const actions = require('../../database/action') 
const prefix = require('../../database/prefixes')
const messages = require('../../database/messages')
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "settings",
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "Unable to run that command: \nThe settings command requires you to have ManageGuild permission."})
        const s = new MessageEmbed()
        const d = await actions.findOne({guildID: message.guild.id})
        const p = await prefix.findOne({guildID: message.guild.id})
        const m = await messages.findOne({guildID: message.guild.id})
        s.setTitle(`Settings for ${message.guild.name}`)
        s.setColor("#db149f")
        if(p) {
            s.addField('Prefix:', `\`\`\`h\n${p.prefix || "s."}\`\`\``)
        } else {
            s.addField('Prefix:', "```h\ns.```")

        }
        if(d) {
            s.addField('Member log channel ID -', `\`\`\`h\n${d.channelID || "No Log Channel"}\`\`\``)
            string = {}
            if(d.action === "timeout") {
                string = `timeout for ${require("pretty-ms")(d.mutetime*1)}`
            } else {
                string = `${d.action || "None"}`
            }
            s.addField('Action:', `\`\`\`h\n${string}\`\`\``)
        } else {
            s.addField('Member log channel ID:', "```h\nNo Log Channel```")
            s.addField('Action:', "```h\nNone```")

        } 
        if(m) {
            s.addField('Message log channel ID:', `\`\`\`h\n${m.channelID || "None"}\`\`\``)
        } else {

            s.addField('Message log channel ID:', "```h\nNone```")
        }
        message.channel.send({embeds: [s]})

        
    }

}