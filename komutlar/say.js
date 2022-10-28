const Discord = require("discord.js");

exports.run = (client, message) => {
  let say = new Discord.MessageEmbed()
    .setAuthor("DEATHH CODE SAY")
    .setColor("WHİTE")
   .addField("**Toplam Kullanıcı**",message.guild.memberCount )
    .addField("**Çevrimiçi Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'online').size)
  .addField("**Boşta Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'idle').size)
.addField("**Rahatsız Etmeyindeki Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'dnd').size)
.addField("**Çevrimdışı Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'offline').size)

    .setTimestamp()
  return message.channel.send(say);
};

module.exports.conf = {
  aliases: ["say"],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "say",
  description: "",
  usage: ""
};

