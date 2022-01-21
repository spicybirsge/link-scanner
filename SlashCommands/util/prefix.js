const { Interaction } = require('discord.js')
const prefix = require('../../database/prefixes')
module.exports = {
    name: 'prefix',
    description: "Get the servers prefix",
    run: async (client, interaction) => {

    const data = await prefix.findOne({guildID: interaction.guild.id})
    if(data === null) {
        GUILD_PREFIX = "s."
    } else {
        GUILD_PREFIX = data.prefix
    }
    
    await  interaction.followUp({ content: `Prefix for this server: \`${GUILD_PREFIX}\`` });
  
}
}
