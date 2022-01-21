
const { Client, Collection } = require("discord.js")
const client = new Client({
    intents: ["GUILDS",
    
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING"],
    restTimeOffset: 0,
    allowedMentions: {
        parse: ['users']
    }
})

module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
require('./handler')(client);
process.on('unhandledRejection', error => {
    console.log(error)
})
process.on("uncaughtException",error => {
    console.log(error)
})
process.on('multipleResolves',error => {
    console.log(error)
 });
 client.on('error', (err) => {
     console.log(err)
 })
client.login(process.env.token)

