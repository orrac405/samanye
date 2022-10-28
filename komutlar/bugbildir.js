

const Discord = require('discord.js')

    exports.run = async(client, message, args) => {
        let sikayetmesaj = args.slice(0).join(' ')
        
        if(!sikayetmesaj){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`**Şikayetini Girmen Gerekiyor**`)
            .setColor('#ff0000')
            return message.channel.send(cmfhata)
        }

        // Zaman
        var zaman = new Date(); 
        var codemarefizaman = zaman.getDate() + "/"+ (zaman.getMonth()+1)  + "/" + zaman.getFullYear() + " - " + zaman.getHours() + ":" + zaman.getMinutes() + ":" + zaman.getSeconds();

        // Sunucunun İnvitesi İçin
        if(sikayetmesaj){
            message.channel.createInvite().then(inv => {
                const codemarefisikayet = new Discord.MessageEmbed()
                .setDescription(`
                    **${message.guild.name}** Adlı Sunucudan ${message.author} Kişisi Bot Hakkında Şikayette Bulundu, Edilen Şikayet - **${sikayetmesaj}**\n
                    Sunucunun Davet Linki: ${inv.url}
                `)
                .setColor('RANDOM')
                .setTitle(`**Şikayet Var**`)
                .setFooter(codemarefizaman)
                client.channels.cache.get('1006533978137821304').send(codemarefisikayet)
            })

        }
    }


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Şikayet','Report','ŞİKAYET','REPORT','report'],
    permLevel: 0
}

exports.help = {
    name: 'şikayet'
}