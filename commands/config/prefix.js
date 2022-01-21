const datap = require('../../database/prefixes')
module.exports = {
    name: "prefix",
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "Unable to run that command: \nThe prefix command requires you to have ManageGuild permission."})
        const prefix = args[0]
        if(!prefix) return message.channel.send({content: "You didn't provide a prefix argument."})
    datap.findOne({guildID: message.guild.id}, async(err, data) => {
        if(data) {
            data.prefix = prefix
            await data.save()
        } else {
            new datap({guildID: message.guild.id, prefix: prefix}).save()
        }
    })
            message.channel.send({content: `Updated prefix for this server to \`${prefix}\``})
        

    }
}