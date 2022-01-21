const client = require('../index')
const time = require('../database/action')
client.timeout = async(message, member) => {

    time.findOne({guildID: message.guild.id}, async (err, data) => {
        const time = data.mutetime


    

    member.timeout(time*1, "Posted a phishing/scam link. Action has been set to timeout.")
})
};