// Ufqzyn#3006
const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
 
  let HG = args.slice(0).join(' ');
  if(HG.length < 5) return message.channel.send(new Discord.MessageEmbed()
  .setColor("#fdcf5c")
  .setAuthor(`Hoşgeldin Mesajı`, client.user.avatarURL())
  .setDescription(`Hoşgeldin Mesajını Ayarlamak İçin \`${prefix}hoşgeldin-mesaj <mesaj>\``)
  .addField("Kullanılabilen Karakterler", `+ Sunucu Adı: **-sunucu-**\n+ Kullanıcı Tag: **-üye-**\n+ Kullanıcı Etiket: **-üyeetiket-**\n+ Toplam Kanal Kullanıcı: **-üyekaldı-**\n+ Toplam Kullanıcı: **-üyesayisi-**\n+ Sunucu Bölgesi: **-sunucubolgesi-**`)
  .addField("Örnek Kullanım", `\`\`\`fix\n${prefix}hoşgeldin-mesaj -üyeetiket- Kullanıcı Sunucumuza Hoşgeldin Bu Sunucu de Eğlenebilir, Sohbet Edebilir Arkadaş Ortamı Oluşturabilirsin Yetkili Olarak Bize Yardımcı Olabilir Ve Üyelere Güzel Günler Geçirebilirsin -sunucu- Adlı Sunucumuza HOŞGELDİN\`\`\``)
  .setFooter(`Hoşgeldin Mesajı`, client.user.avatarURL())
);

 message.channel.send('Hoşgeldin Mesajı Ayarlandı\n\`\`\`fix\n'+HG+'\`\`\`')
 db.set(`hg_${message.guild.id}`, HG)
};
exports.conf = {
  aliases: ["hoşgeldin-mesaj", "hşgldn-mesaj", "hg-mesaj", "karşılama-mesaj"]
}
exports.help = {
name: 'hoşgeldin-mesaj'
};
// Ufqzyn#3006