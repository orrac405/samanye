const Discord = require("discord.js");
const { MessageButton, MessageSelectMenu, MessageActionRow, Permissions} = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (!["933833033579114506","830008975335489567"].includes(message.author.id)) {
    return; 
  }

        const toEval = args.slice(0).join(" ")
        //if(!toEval) return message.reply(`**Kod Yazmalısın!**`)  

        try {
            var evaled = clean(await eval(toEval));
            if (evaled.match(new RegExp(`${client.token}`, "g")))
                         
                 evaled
                .replace("token", "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**")
                .replace(
                  client.token,
                  "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**"
                )
             message.channel.send(
              `\`\`\`js\n${evaled
                .replace(
                  client.token,
                  "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**"
                )}\`\`\``, 
            );
          } catch (err) {
            message.channel.send(`\`\`\`js\n${err}\`\`\``);
          }
        
          function clean(text) {
            if (typeof text !== "string")
              text = require("util").inspect(text, { depth: 0 });
            text = text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203));
            return text;
          }
};
module.exports.conf = {

  aliases: []
};

module.exports.help = {
  name: "eval"
}; 