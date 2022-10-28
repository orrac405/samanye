const Discord = require('discord.js')

    exports.run = async(client, message, args) => {

        const unban = await message.guild.fetchBans()
        
        for(const cs of unban.array()){
            await message.guild.members.unban(cs.user.id)
            message.react('✅') //Eğer İşlem Başarılı Olursa Mesajımıza Emoji Ekleyelim
        }

    }

exports.conf = {

    aliases: ['Unbanall','UNBANALL','unban all','Unban all']
}

exports.help = {
    name: 'unbanall'
}//by Ege#0003
