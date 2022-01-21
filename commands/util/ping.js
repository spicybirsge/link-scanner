const { Client } = require("discord.js");
module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        const l = await message.channel.send('Pinging...')
        const ping = l.createdTimestamp - message.createdTimestamp
        await l.edit(`Pong! (Websocket: ${client.ws.ping}ms. Roundtrip: ${ping}ms.)`)

    }
}