const action = require('../../database/action')
const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const ms1 = require('pretty-ms')
module.exports = {
    name: "action",
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "Unable to run that command: \nThe action command requires you to have ManageGuild permission."})
  
        const help = new MessageEmbed()
        .setTitle("Action Help")
        .setDescription("Configure what action you want to take on users who post scam urls. \n Example: `s.action kick`, \n `s.action timeout 10d` \n Categories: \n`kick` - Kicks a member whenever a member posts a scam URL \n `ban` - Bans a member whenever a member posts a scam URL \n `mute` - Adds a role called muted whenever a member posts a scam URL \n `timeout` - Timeout a user according to configured time whenever a member posts a scam URL. \n `none` - No action will be taken on user, except for deleting the scam message.")
        if(!args[0]) return message.channel.send({embeds: [help]})
        const what = args[0]
        const cat = what.toLowerCase()
        if(cat === "kick") {
            action.findOne({guildID: message.guild.id}, async (err, data) =>{
                if(data) {
                    data.action = "kick"
                    await data.save()
                } else {
                    new action({guildID: message.guild.id, action: "kick"}).save()
                }
            })
            return message.channel.send({content: "Now kicking members that post scams."})
        } else {
            if(cat === "ban") {
                action.findOne({guildID: message.guild.id}, async (err, data) =>{
                    if(data) {
                        data.action = "ban"
                        await data.save()
                    } else {
                        new action({guildID: message.guild.id, action: "ban"}).save()
                    }
                })
                return message.channel.send({content: "Now banning members that post scams."})

            } else {
                if(cat === "mute") {
                    action.findOne({guildID: message.guild.id}, async (err, data) =>{
                        if(data) {
                            data.action = "mute"
                            await data.save()
                        } else {
                            new action({guildID: message.guild.id, action: "mute"}).save()
                        }
                    })
                    return message.channel.send({content: "Now muting members that post scams."})


            } else {
                if(cat === "timeout") {
                    const time = args[1]
                    if(!time) return message.channel.send({content: "You didn't provide a time as an argument."})
                    const p = ms(time)
                    if(isNaN(p)) return message.channel.send({content: "Your argument time is not a number."})
                    if(1*p > 2419200000) return message.channel.send({content: "Your argument time is too high."})
                    action.findOne({guildID: message.guild.id}, async (err, data) =>{
                        if(data) {
                            data.action = "timeout"
                            data.mutetime = p
                            await data.save()
                        } else {
                            new action({guildID: message.guild.id, action: "timeout", mutetime: p}).save()
                        }
                    })
                    return message.channel.send({content: `Now timeouting members that post scams for ${ms1(1*p)}`})

                } else {
                    if(cat === "none") {
                        action.findOne({guildID: message.guild.id}, async (err, data) =>{
                            if(data) {
                                data.action = "none"
                                
                                await data.save()
                            } else {
                                new action({guildID: message.guild.id, action: "none"}).save()
                            }
                        })
                        return message.channel.send({content: "Now not punishing members that post scams."})
                } else {
                    return message.channel.send({embeds:[help]})
                }
            }
        }


    }
}
}
}