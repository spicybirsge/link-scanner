const client = require('../index')
client.ban = async(message, reason) => {
    message.member.ban({reason: reason})
};