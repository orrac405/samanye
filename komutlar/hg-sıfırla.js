// Ufqzyn#3006
const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarkar.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
 const rol = db.fetch(`hgK_${message.guild.id}`)
 if(!rol) return message.reply(`Bu özellik zaten kapalı!`)
 
 
  message.channel.send(`Sayaç başarılı bir şekilde kapatıldı.`)

 
  db.delete(`hgK_${message.guild.id}`)
  db.delete(`hg_${message.guild.id}`)
  db.delete(`hgR_${message.guild.id}`)
};
exports.conf = {
    aliases: ["hoşgeldin-sıfırla", "hşgldn-sıfırla", "hg-sıfırla", "karşılama-sıfırla", "hoşgeldin-kapat", "hşgldn-kapat", "hg-kapat", "karşılama-kapat"]
}
exports.help = {
  name: 'hoşgeldin-sıfırla'
};
// Ufqzyn#3006