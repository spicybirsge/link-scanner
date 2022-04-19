
const { Client, Collection } = require("discord.js")
const client = new Client({
    intents: ["GUILDS",
    
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
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
    console.error(error)
})
process.on("uncaughtException",error => {
    console.error(error)
})
process.on('multipleResolves',error => {
    console.error(error)
 });
 client.on('error', (err) => {
     console.error(err)
 })
client.login(process.env.token)

