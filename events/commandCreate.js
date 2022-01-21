const client = require("../index");
const p = require('../database/prefixes')
client.on("messageCreate", async (message) => {
    if(message.channel.type === "DM") return;
    if (message.author.bot) return;
    if(!message.guild) return;
    let data = await p.findOne({guildID: message.guild.id})
   if(data === null) {
       prefix = "s."
   } else {
       prefix = data.prefix.toLowerCase()
   }
 

    
       
    if(!message.content.toLowerCase().startsWith(prefix)) return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
    

});