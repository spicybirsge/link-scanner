const client = require('../index')
const {MessageEmbed} = require("discord.js")
const log = require("../database/action");
require('../client.util.actions/kick')
require('../client.util.actions/ban')
require('../client.util.actions/mute')
require('../client.util.actions/timeout')
client.action = async(message, member, trust, type, link, redirect) => {
    log.findOne({guildID: message.guild.id}, async (err, data) => {
        if(data) {
    const channel = client.channels.cache.get(data.channelID)
    const action = data.action
    const log_creation = new MessageEmbed()
    .setAuthor({ name: `New ${trust > 0.94 ? `${type}` : "suspicious"} link posted.`, iconURL: message.author.avatarURL() })
    .setDescription(`\`\`\`h\nAuthor - ${message.author.tag}\nID - ${message.author.id}\nDomain - ${link}\nType of Scam - ${type}\nIs Domain a redirect? - ${redirect}\nAction - ${data.action}\`\`\``)
   .setColor("RED")
   if(trust < 0.95) {
    log_creation.addField("Action Not Taken on User", `\`\`\`h\nNot taking action on user due to - "This link is not confirmed to be malicious, to prevent user being punished for no reason no action was taken."\`\`\``)
    if(channel) {
        channel.send({embeds: [log_creation]})
    }
    return;
}
   if(action === "kick") {
       if(!message.member.kickable) {
           log_creation.addField("Action Failure Warning", `\`\`\`h\nAction Failure Warning - "Action was set to kick but I was unable to kick the member."\`\`\``)
           if(channel) {
               channel.send({embeds: [log_creation]})
           }
           return;
       }
       client.kick(message, `Posted ${type} link: ${link} and action was set to kick`)
       if(channel) {
        channel.send({embeds: [log_creation]})
    }
    return;
   } else {
       if(action === "ban") {
        if(!message.member.bannable) {
            log_creation.addField("Action Failure Warning", `\`\`\`h\nAction Failure Warning - "Action was set to ban but I was unable to ban the member."\`\`\``)
            if(channel) {
                channel.send({embeds: [log_creation]})
            }
            return;
        }
        client.ban(message, `Posted ${type} link: ${link} and action was set to ban`)
        if(channel) {
         channel.send({embeds: [log_creation]})
     }
     return;
    
       } else {
    if(action === "mute") {
        try {
            client.mute(message, `Posted ${type} link: ${link} and action was set to mute`)
            if(channel) {
                channel.send({embeds: [log_creation]})
            }
        } catch (e) {
            log_creation.addField("Action Failure Warning", `\`\`\`h\nAction Failure Warning - "${e}"\`\`\``)
            if(channel) {
                channel.send({embeds: [log_creation]})
            }

        }
        return;
    } else {
        if(action === "timeout") {
            if(!message.member.moderatable) {
                log_creation.addField("Action Failure Warning", `\`\`\`h\nAction Failure Warning - "Action was set to timeout but I was unable to timeout the member."\`\`\``)
                if(channel) {
                    channel.send({embeds: [log_creation]})
                }
                return;
            }
            client.timeout(message, `Posted ${type} link: ${link} and action was set to timeout`)
            if(channel) {
                channel.send({embeds: [log_creation]})
            }
            return;

        } else {
            if(channel) {
                channel.send({embeds: [log_creation]})

            }
            return;
        }
    }

}
   } 
   

        }

    })

};