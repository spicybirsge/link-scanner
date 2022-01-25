const fetch = require('node-fetch')

module.exports = {
    name: 'check',
    description: "Check if a domain is a know scam domain or not",
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
        const f = await fetch('https://anti-fish.bitflow.dev/check', {
                    method: 'POST',
                    body: JSON.stringify({
                        message: domain
                    }),
          headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Link Scanner/test-build",
                    
                    }
                });

        const status = f.status
        if(status === 200) {
            return interaction.followUp({content: ":white_check_mark: This is a known scam domain."})

        } else {
            return interaction.followUp({content: ":x: This is a not known scam domain."})

        }

    }
}