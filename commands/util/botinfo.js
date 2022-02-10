const Discord = require ("discord.js")
const cooldown = new Set();
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
 const os = require('os');
 let cpuStat = require("cpu-stat")
module.exports = {

  name: "botinfo",

  category: "utility",
    aliases: ['stats'],
    description: 'Checks bots uptime, ram usage,etc',
  run: async (client, message, args, member) => {
  
         let cpuLol;
        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const promises = [
              client.shard.fetchClientValues('guilds.cache.size'),
              client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
              client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)),
            ];
            Promise.all(promises)
	.then(results => {
		const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
		const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
    const totalchannels = results[2].reduce((acc,channelCount) => acc + channelCount, 0);
    let embed = new Discord.MessageEmbed()
    .setTitle("Statistics")
    .setDescription(`•**Users:** ${totalMembers} \n•**Servers:** ${totalGuilds}\n•**Channels:** ${totalchannels}\n•**Discord.js:** ${discordjsVersion}\n•**Node:** ${process.version}\n \n **Host**\n•**Shard:** ${client.shard.ids*1+1}/${client.shard.count}\n•**Uptime:** ${ms(client.uptime)}\n•**Operating system:** ${process.platform} ${process.arch}\n•**CPU load:** ${percent.toFixed(2)}%\n•**Ram usage:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB`)
    .setColor("#db149f")
    message.channel.send({embeds: [embed]})



})
.catch(console.error);
      
    })

}
}