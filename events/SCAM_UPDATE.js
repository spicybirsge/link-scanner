const client = require("../index");
const { MessageEmbed}  = require("discord.js")
const fetch = require('node-fetch')
const log = require('../database/action');
const action = require("../database/action");
client.on('messageUpdate', async  (oldmessage, message) => {
    if(message.channel.type === "DM") return;
    if(message.author.bot) return;
if(oldmessage.content === message.content) return;
    const regex =   /([-a-zA-Z0-9_-]{2,256}\.[a-z]{2,10})(?:\/(\S*))?\b/g;
    if(regex.test(message.content)) {
  
        const f = await fetch('https://anti-fish.bitflow.dev/check', {
                    method: 'POST',
                    body: JSON.stringify({
                        message: message.content
                    }),
          headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Link Scanner/test-build",
                    
                    }
                });

        const status = f.status
  
        if(status === 200) {
            message.delete()
     log.findOne({guildID: message.guild.id}, async (err, data) => {

         if(data) {
             const channel = client.channels.cache.get(data.channelID)
             const log = new MessageEmbed()
             .setAuthor({ name: 'New Phishing Link Posted', iconURL: message.author.avatarURL() })
             .setDescription(`Posted by: ${message.author.tag} \n User ID: ${message.author.id} \n Channel: #${message.channel.name} \n Actions: ${data.action}`)
             .setColor("RED")
         
             const action = data.action
           
             if(action === "kick") {
                 const error = new MessageEmbed()
                 .setAuthor({ name: 'New Phishing Link Posted', iconURL: message.author.avatarURL() })
                 .setDescription(`Posted by: ${message.author.tag} \n User ID: ${message.author.id} \n Channel: #${message.channel.name} \n Actions: action was set to kick but I was unable to kick the user.`)
                 .setColor("RED")
                 if(!message.member.kickable) {
                     return channel.send({embeds: [error]})
                 }
                 message.member.kick("Posted a phishing/scam link. Action has been set to kick.")
                 return  channel.send({embeds: [log]})
             } else { 
                 
              if(action === "ban") {
                const error1 = new MessageEmbed()
                .setAuthor({ name: 'New Phishing Link Posted', iconURL: message.author.avatarURL() })
                .setDescription(`Posted by: ${message.author.tag} \n User ID: ${message.author.id} \n Channel: #${message.channel.name} \n Actions: action was set to ban but I was unable to ban the user.`)
                .setColor("RED")
                if(!message.member.bannable) {
                    return channel.send({embeds: [error1]})
                }
                    message.member.ban({reason: "Posted a phishing/scam link. Action has been set to ban."})
                    return  channel.send({embeds: [log]})
                 
             } else {
                 if(action === "mute") {
                   
                  
                   
                     const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");
                     const error2 = new MessageEmbed()
                     .setAuthor({ name: 'New Phishing Link Posted', iconURL: message.author.avatarURL() })
                     .setDescription(`Posted by: ${message.author.tag} \n User ID: ${message.author.id} \n Channel: #${message.channel.name} \n Actions: action was set to mute but I was unable to mute the user: no role called "muted" found.`)
                     .setColor("RED")
                     const error3 = new MessageEmbed()
                     .setAuthor({ name: 'New Phishing Link Posted', iconURL: message.author.avatarURL() })
                     .setDescription(`Posted by: ${message.author.tag} \n User ID: ${message.author.id} \n Channel: #${message.channel.name} \n Actions: action was set to mute but I am missing ManageRoles permission.`)
                     .setColor("RED")
                     const error4 = new MessageEmbed()
                     .setAuthor({ name: 'New Phishing Link Posted', iconURL: message.author.avatarURL() })
                     .setDescription(`Posted by: ${message.author.tag} \n User ID: ${message.author.id} \n Channel: #${message.channel.name} \n Actions: action was set to mute but the mute role is above my role.`)
                     .setColor("RED")
                     if(!role) return channel.send({embeds: [error2]})
                     if(!message.guild.me.permissions.has("MANAGE_ROLES")) return channel.send({embeds: [error3]})
                     if(message.guild.me.roles.highest.position < role.position) return channel.send({embeds: [error4]})
                     message.member.roles.add(role, "Posted a phishing/scam link. Action has been set to mute.")
                     return  channel.send({embeds: [log]})

                    
                 } else {
                     if(action === "timeout") {
                         
                        client.timout = require('../client.util.actions/timeout')
                         if(!message.member.moderatable) {
                            const error5 = new MessageEmbed()
                            .setAuthor({ name: 'New Phishing Link Posted', iconURL: message.author.avatarURL() })
                            .setDescription(`Posted by: ${message.author.tag} \n User ID: ${message.author.id} \n Channel: #${message.channel.name} \n Actions: action was set to timeout but I was unable to timeout the user.`)
                            .setColor("RED")
                            return channel.send({embeds: [error5]})

                         }
                         client.timeout(message, message.member)
                         return  channel.send({embeds: [log]})

                     } else {
                        return  channel.send({embeds: [log]})

                     }
                 }
             } 
            }
            
         }
        })
        }
    }
    

})