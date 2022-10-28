const ayarlar = require('../ayarlar.json');
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const db = require("quick.db");
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
     if(db.has(`bakım_${client.user.id}`)){
    if(message.author.id !== "830008975335489567") return message.channel.send(
    new Discord.MessageEmbed()
      .setColor('BLACK')
      .setAuthor(`${client.user.username} Bakım`, client.user.displayAvatarURL({dynamic: true, format: "png"}))
      .setTitle("Botumuz bakımdadır! Lütfen daha sonra tekrar deneyiniz.")
      .setFooter(`${message.author.tag} istedi!`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
    )
  }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
 }; 