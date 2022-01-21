const datap = require('../../database/prefixes')
module.exports = {
    name: "prefix",
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "Unable to run that command: \nThe prefix command requires you to have ManageGuild permission."})
        const prefix = args[0]
        if(!prefix) return message.channel.send({content: "You didn't provide a prefix argument."})
        let data;
        try {
            data = await datap.findOne({
                guildID: message.guild.id
            })
            if(!data) {
                data2 = await datap.create({guildID: message.guild.id, prefix: prefix})
                data2.save()
            } else {
                await datap.findOneAndUpdate({guildID: message.guild.id, prefix: prefix})            }
        } catch {
            console.log("something went wrong.")
        }
            message.channel.send({content: `Updated prefix for this server to \`${prefix}\``})
        

    }
}