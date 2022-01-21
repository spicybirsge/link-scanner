const client = require("../index");
client.on('ready', async => {
console.log(`Logged in as ${client.user.tag}`)
client.user.setActivity(`s.help`, { type: 'LISTENING' }) 
})