const prefix = require('../../database/prefixes')
module.exports = {
    name: 'prefix',
    description: "Get the servers prefix",
    run: async (client, interaction) => {

prefix.findOne({guildID: interaction.guild.id}, async (err, data) => {
        if(data) {
            GUILD_PREFIX = data.prefix
            
        } else {
            GUILD_PREFIX = "s."
        }
        return interaction.followUp({ content: `Prefix for this server: \`${GUILD_PREFIX}\`` });
    })
    
    
    
  
}
}
