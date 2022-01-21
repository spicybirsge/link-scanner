const mongoose = require("mongoose")
const PrefixData = mongoose.Schema({
  guildID: String,
  prefix: String,
 
})
module.exports = mongoose.model('prefixes', PrefixData)