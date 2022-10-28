const Discord = require('discord.js');
exports.run = (client, message, args) => {

if (!message.guild) {
const ozelmesajuyari = new Discord.MessageEmbed()
.setColor(0x2488E7)
.setTimestamp()
.setAuthor(message.author.username, message.author.avatarURL())
.addField('Hey Sen ', 'Merhaba Bu Komut DM de Kullanılamaz!')
return message.channel.send(ozelmesajuyari); 
}

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`YÖNETİCİt\`" yetkisine sahip olmalısın.`);

let mesaj = args.slice(0).join(' ');
if (!mesaj) return message.channel.send('Birşey Yazmalısınız')

message.delete({timeout: 300});

const mesajat = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription('' + mesaj + '')
message.guild.members.cache.map(users =>users.send(mesajat))

message.channel.send(`✅ Mesaj basariyla gonderildi.`);

};

exports.conf = {
aliases: ['duyurlaherkese']
};

exports.help = {
name: 'lucky'
};