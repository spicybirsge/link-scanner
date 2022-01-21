
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
    if(cooldown.has(message.author.id)) {
  message.react("⏳")
} else {
         let cpuLol;
        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            let embed = new Discord.MessageEmbed()
            .setTitle("Statistics")
            .setDescription(`•**Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} \n•**Servers:** ${client.guilds.cache.size}\n•**Channels:** ${client.channels.cache.size}\n•**Discord.js:** ${discordjsVersion}\n•**Node:** ${process.version}\n \n **Host**\n•**Uptime:** ${ms(client.uptime)}\n•**Operating system:** ${process.platform} ${process.arch}\n•**CPU load:** ${percent.toFixed(2)}%\n•**Ram usage:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB`)
            .setColor("#db149f")
            message.channel.send({embeds: [embed]})
 
        cooldown.add(message.author.id);
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, 5000);
})
    }
}
}