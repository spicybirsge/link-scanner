const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "execute",
  aliases: ["eval", "ev"],
   
  run: async (client, message, args, async ) => {



if(message.author.id !== '818903544723406858') return;
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
try {
  const args = message.content.split(" ").slice(1)
      const code = args.join(" ");
      let evaled = eval(code)
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``});
    }
}
}