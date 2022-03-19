const fetch = require('node-fetch')
const {MessageEmbed, Message} = require("discord.js")
module.exports = {
    name: 'check',
    description: "Check if a domain is a known scam domain or not",
    options: [
      {
        name: 'domain',
        description: 'The domain you want to check.',
        type: 'STRING',
        required: true,
        
      },
     
    ],
   
    run: async (client, interaction) => {
        const domain = interaction.options.getString('domain')
        const regex =   /([-a-zA-Z0-9_-]{2,256}\.[a-z]{2,10})(?:\/(\S*))?\b/g;
        if(!regex.test(domain)) return interaction.followUp({content: ":x: No domain was found in this command."})
        const f = await fetch('https://anti-fish.bitflow.dev/check', {
                    method: 'POST',
                    body: JSON.stringify({
                        message: domain
                    }),
          headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Link Scanner/test-build",
                    
                    }
                }).then(res => res.json()).then(async(data) => {
                    

       
                    if(data.match) {
            const scam111 = new MessageEmbed()
            .setTitle(":warning: Scam Domain Found")
            .addField("Name:", data.matches[0].domain || "Was Unable to get the data :(")
            .addField("Type of Scam:", data.matches[0].type.toLowerCase().replace("_", " ") || "Was Unable to get the data :(")
            .addField("Redirect?", data.matches[0].followed ? "Yes" : "No" || "Was Unable to get the data :(")
            .setColor("RED")
            .setThumbnail("https://cdn.discordapp.com/attachments/943887879078297610/954598948859961375/Z.png")
            return interaction.followUp({embeds: [scam111]})

        } else {
            return interaction.followUp({content: ":x: This is a not known scam domain."})

        }
    })

    }
}