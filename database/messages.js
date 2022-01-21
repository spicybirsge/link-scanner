const mongoose = require("mongoose")
const MessageData = mongoose.Schema({
  guildID: String,
  channelID: String,
 
})
module.exports = mongoose.model('messages', MessageData)