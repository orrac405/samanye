const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;
exports.run = async(client, message, args) => {
if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setColor(`RANDOM`)
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
.setAuthor(`Sennpai - Yardım`, client.user.avatarURL())
.setDescription(
`  Linkler: Botu ekle [Tıkla](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)

Botda hata aldıysanız bu komutu kullanarak şikayet gönderebilirsiniz : \`${prefix}şikayet\`

**${prefix}botlist** = Botlist sistemini görürsünüz.
**${prefix}istatistik** = Botun istatiğini görürsünüz.
**${prefix}otorol  ** = Otorol ayarlarsınız.
**${prefix}slowmmode** = Sohbeti spam atmaktan korur.
**${prefix}sunucubilgi ** = Sunucunuzun bilgilerini öğrenirsiniz.
**${prefix}sunucu-tanıt ** = sunucu reklamların oldugu kanalda sunucunuzun reklamını yapar.


Linkler:  - [Destek](https://discord.gg/https://discord.gg/KSCdw3ypj5)`
)
.setImage(``)
.setTimestamp()
.setFooter(`©2022 Sennpai Bot Geliştiriciler User#0000`, client.user.avatarURL()))
// KOMUTADI
if(args[0] === "yardım"){
return message.channel.send(new Discord.MessageEmbed()
.setColor(`RANDOM`)
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
.setAuthor(`Sennpai - yardım`, client.user.avatarURL())
.setDescription(
`**${prefix}botlist** = Botlist sistemini görürsünüz.
**${prefix}istatistik** = Botun istatiğini görürsünüz.
**${prefix}otorol  ** = Otorol ayarlarsınız.
**${prefix}slowmmode** = Sohbeti spam atmaktan korur.
**${prefix}sunucubilgi ** = Sunucunuzun bilgilerini öğrenirsiniz.`
)
.setImage(``)
.setTimestamp()
.setFooter(`©2022 Sennpai BOT - Her zaman`, client.user.avatarURL()))
};
// KOMUTADI
};
exports.conf = {
    aliases: ["d", "help"],
    permLevel: 0
};
exports.help = {
    name: "yardım"
};