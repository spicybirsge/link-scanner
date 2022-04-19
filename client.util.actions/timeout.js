const client = require('../index')
const time = require('../database/action')
client.timeout = async(message, reason) => {

    time.findOne({guildID: message.guild.id}, async (err, data) => {
        const time = data.mutetime


    

    message.member.timeout(time*1, reason)
})
};