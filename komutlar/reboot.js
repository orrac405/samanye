const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { 
  
 if(message.author.id !== "830008975335489567")  return message.channel.send("Sahibim değisilsin hadi işine paşam")
  
  let x = client.ping + 20
  
  .setTitle('Reboot')
  .setDescription("Şu an Neur bot'u yeniden başlatmak üzeresin.")
  .addBlankField()
  .addField('Şu anki Ping Değeri:', '**'+client.ping+'** ms!')
  .addField('Reboot Sonrası Ping Değeri:', '**'+x+'** ms!')
  .addBlankField()
  .addField('__SEÇENEKLER__', '**iptal** `/` **devam**')
  .setFooter(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setColor('RED')
message.channel.send(dcs).then(m => {
  
      let filtre = mes => mes.author.id === message.author.id;    
  message.channel.awaitMessages(filtre, {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
        .then(collected => {
   if(collected.first().content === "iptal") {
 collected.first().delete()
 m.delete()
 message.reply('İşlemi iptal ettim aşkım')    
     
   }
   if(collected.first().content === "devam") {
 collected.first().delete()
let discordcodeshare = new Discord.RichEmbed()
  .setTitle('⩥ Reboot')
  .setDescription("Reboot işlemi başarılı. **Discord Code Share**")
  .setFooter(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setColor('GREEN')
 m.edit(discordcodeshare)
 
  setTimeout(() => {
   
    console.log(`BOT: Bot yeniden başlatılıyor... DCS EKİBİNE AİTTİR.`);
    process.exit(0);
 }, 2000)      
     
   }    

    
    
  })
   
  
  
  
})
  
  
  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['rr'], 
  permLevel: 0
};
  exports.help = {
    name: "reboot", //komutu çalıştıracak olan kelime
    description: "",//açıklama (isteğe bağlı)
    usage: ""//kullanım (isteğe bağlı)
  };  