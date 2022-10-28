const Discord = require("discord.js");
const db = require('croxydb'); // creating database

const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
 
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' Bu komutu kullanmak için gerekli yetkiye sahip değilsin')
   
   
    var kanal = message.mentions.roles.first() 
    
    if(!args[0])return message.channel.send(" Geliştirici rolü ayarlamak için bir kanal belirtmedin.")
    if(!kanal)return message.channel.send(" Geliştirici rolü  ayarlamak için bir kanal belirtmedin.")
    db.set(`bot-developer-rolü_${message.guild.id}`, kanal.id)


    message.channel.send(" Geliştirici rolü başarıyla ayarlandı.")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["developer-rolü"],
  permLevel: 0
};

exports.help = {
  name: "geliştirici-rolü",
  description: "Yardım Menüsünü Gösterir.",
  usage: "yardım"
};   