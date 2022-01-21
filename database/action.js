const mongoose = require("mongoose")
const ActionData = mongoose.Schema({
  guildID: String,
  channelID: String,
  action: String,
  roleID: String,
  mutetime: String
})
module.exports = mongoose.model('actions', ActionData)