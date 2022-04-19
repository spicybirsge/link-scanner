const client = require('../index')
client.kick = async(message, reason) => {
    message.member.kick(reason)
};