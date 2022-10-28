// Ufqzyn#3006
const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
let hgkanal = message.mentions.channels.first()
// let hgrol = message.mentions.roles.first()
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');

// if(!hgrol) return message.channel.send(`Otomatik Rol İçin, Bir Rol Etiketle **Örnek**: \`${prefix}hoşgeldin-ayarla @rol\``)
 if(!hgkanal) return message.channel.send(`Hoşgeldin Mesajı'nın Gideceği Kanal İçin, Bir Kanal Etiketle **Örnek**: \`${prefix}hoşgeldin-ayarla #kanal\``)
 
  message.channel.send(`Hoşgeldin Kanalı **${hgkanal}** Olarak Güncelledim!\nHoşgeldin Mesajı Ayarlamak İçin\`${prefix}hoşgeldin-mesaj\` Yazarak Ayarlayabilirsin!`)
 
//  message.channel.send(`Otomatik Verilecek Rol **${hgrol}** Hoşgeldin Kanalı **${hgkanal}** Olarak Güncelledim!\nHoşgeldin Mesajı Ayarlamak İçin\`${prefix}hoşgeldin-mesaj\` Yazarak Ayarlayabilirsin!`)

//  db.set(`hgR_${message.guild.id}`, hgrol.id)
  db.set(`hgK_${message.guild.id}`, hgkanal.id)
};
exports.conf = {
    aliases: ["hoşgeldin-ayarla", "hşgldn-ayarla", "hg-ayarla", "karşılama-ayarla"]
}
exports.help = {
  name: 'hoşgeldin-ayarla'
};
// Ufqzyn#3006