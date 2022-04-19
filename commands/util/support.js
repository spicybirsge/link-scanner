const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord.js')
const { MessageActionRow } = require('discord.js')
module.exports = {
    name: "support",
    aliases: ["vote", "invite"],
    run: async (client, message, args) => {
       
        const button = new MessageButton()
        .setStyle('LINK')
        .setURL('https://discord.gg/7xv484npRH')
        .setLabel('Support Server')
        const button2 = new MessageButton()
        .setStyle('LINK')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=910448849846431764&permissions=8&scope=bot%20applications.commands')
        .setLabel('Invite Me')
        const button3 = new MessageButton()
        .setStyle('LINK')
        .setURL('https://top.gg/bot/910448849846431764')
        .setLabel('Vote')
        const row = new MessageActionRow()
        .addComponents(button, button2, button3)
        message.channel.send({content: "Click the buttons to vote / invite / join the support server.", components: [row]})
    }
    
}