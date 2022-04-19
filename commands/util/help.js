const { pagination } = require("reconlx")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "help",
    run: async (client, message, args) => {
        let embed1 = new MessageEmbed() 
        .setTitle("Link Scanner Help")
        .setDescription("Hi There! Thanks for using my help command! Now that I am in this server I will delete every single scam link posted. If you want me to take an action on users that post those links use: `s.action` and if you want me to log in a channel use `s.log`. Use the buttons below to view commands.")
        .setColor("RANDOM")
       
        const embed2 = new MessageEmbed()
        .setTitle("Utility")
        .setDescription("`ping` - shows the bots ping and latency \n`botinfo` - shows some stats related to the bot. \n`support` - sends the support server url. \n`settings` - sends the current server configuration. \n`/check` - check if a domain is a know scam domain or not. \n`/prefix` - sends the current prefix of me.")
        .setColor("RANDOM")
        const embed3 = new MessageEmbed()
        .setTitle("Config")
        .setDescription("`prefix` - change my prefix. \n`action` - set the action you want to take on users that post scams. \n`log` - configure logging. \n`disable` - disable a category of logging.")
        .setColor("RANDOM")
        let embeds = [embed1, embed2, embed3]
        pagination({
           
            embeds: embeds,
            channel: message.channel,
            author: message.author,
            
            time: 600000     
          })

    } 
}