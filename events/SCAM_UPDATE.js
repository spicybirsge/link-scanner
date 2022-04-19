const client = require("../index");
const { MessageEmbed}  = require("discord.js")
const fetch = require('node-fetch')
const log = require('../database/action');
const action = require("../database/action");
client.on('messageUpdate', async  (oldmessage, message) => {
    if(oldmessage.content === message.content) return;
    if(message.channel.type === "DM") return;
    if(message.author.bot) return;
        const regex =   /([-a-zA-Z0-9_-]{2,256}\.[a-z]{2,10})(?:\/(\S*))?\b/g;
        cleanified = message.content
        if(regex.test(cleanified)) {
      
            const f = await fetch('https://anti-fish.bitflow.dev/check', {
                        method: 'POST',
                        body: JSON.stringify({
                            message: cleanified
                        }),
              headers: {
                            "Content-Type": "application/json",
                            "User-Agent": "Link Scanner/test-build",
                        
                        }
                    }).then(res => res.json()).then(async(data) => {
                        
                        
                        if(data.match) {
                            
                            console.log(`${Date.now()}: Found a ${data.matches[0].type.toLowerCase().replace("_", " ")} link in the guild ${message.guild.name} by ${message.author.tag}`)
                        message.delete()
                        client.action(message, message.member, data.matches[0].trust_rating, data.matches[0].type.toLowerCase().replace("_", " "), data.matches[0].domain,  data.matches[0].followed ? "Yes" : "No")
                        }
                    })
    
                }
            })