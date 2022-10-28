const Discord = require("discord.js");
require('./invite.js')
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ["MESSAGE", "USER", "REACTION"]
});
const { JsonDatabase } = require("wio.db");
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");//
const fs = require("fs");
const ai = require("@codare/codare.ai")
const moment = require("moment");
const rss = require('rss-converter');
const Jimp = require("jimp");
require("./r.js")
const qdb = require("quick.db");
const odb = require("orio.db")
var prefix = ayarlar.prefix;
const { Database } = require("nukleon")
const vids = new Database("link-data.json")

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token); //dc bak
///
//Sayaç Sistemi



////
client.cooldown = new Discord.Collection();
client.config = {
  cooldown: 1 * 1000
}
client.db = require("quick.db");
client.on("message", async (message) => {
  if (!message.guild || message.author.bot) return;
  // XP
  exp(message);
  function exp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || (Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
      let exp = client.db.add(`exp_${message.author.id}`, 1);
      let level = Math.floor(0.3 * Math.sqrt(exp));
      let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`, 1);;
      if (level > lvl) {
        let newLevel = client.db.set(`level_${message.author.id}`, level);
        message.channel.send(`:tada: ${message.author.toString()}, Level atladın yeni levelin ${newLevel}!`);
      }
      client.cooldown.set(`${message.author.id}`, Date.now());
    }
  }
});
/////////////////////SERVER PANEL////////////////////////
client.on("guildMemberAdd", async (member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if (sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x => (x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x => (x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x => (x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.find(x => (x.name).startsWith("Rekor Aktiflik •"))

    if (member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try {
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
    } catch (e) { }
  }
})

client.on("guildMemberRemove", async (member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if (sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x => (x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x => (x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x => (x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.
      find(x => (x.name).startsWith("Rekor Aktiflik •"))

    if (member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try {
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
    } catch (e) { }
  }
})
////

///
const express = require("express")
const app = express()
app.listen(process.env.PORT)
//client.login("").catch(() => console.log("error")

/////
client.on("message", message => {

  if (message.channel.id == "1010554616519331941") {

    if (message.attachments.size < 1) return message.delete();
    if (message.member.roles.cache.get("1010554576866381966")) return message.delete();
    let kod = "`"
    message.react("<:tik:1007310699904643163>");
    message.react("<:no:1007310697341911040>");
    message.react("<:sorun:1007310693843869737>");
    const filter = (reaction, user) => {

      return message.guild.members.cache.get(user.id).roles.cache.has("1010554576866381966") && !user.bot;
    };
    const collector = message.createReactionCollector(filter, {});
    collector.on('collect', async (reaction, user) => {

      if (reaction.emoji.name == "tik") {
        message.guild.member(message.author.id).roles.add("1010555155395117056")
        message.reactions.removeAll()
        message.delete()
        ///         
        client.channels.cache.get("1010556285885890621").send(`${message.author}, **İsimli Üyeye ${kod}${user.tag}${kod} Tarafından ${kod}ABONE${kod} Rolü Verildi!**`); //ABONE
      } else if (reaction.emoji.name == "no") {
        message.guild.member(message.author.id).roles.remove("1010555155395117056")
        message.delete()
        client.channels.cache.get("1010556285885890621").send(`${message.author}, **Ekran görüntüsü reddedildi | ${kod}${user.tag}${kod}**`); // TAKİPÇİ
      } else if (reaction.emoji.name == "sorun") {

        message.delete()
        client.channels.cache.get("1010556285885890621").send(`${message.author}, **Lütfen Ekran Görüntünüzü Kontrol Ediniz | ${kod}${user.tag}${kod}**`); // TAKİPÇİ
      }
    });
  };
});
/////



app.listen(3000);
////
// KARŞILAMA HOŞGELDİN MESAJ // Ufqzyn#3006
client.on("ready", async () => {
  console.log("Youtube sistemi aktif oldu.");
  setInterval(async () => {
    await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + ayarlar.channel_yt).then(async videos => {
      const v = await vids.fetch(`vid`)
      if (v.includes(videos.items[0].link)) return;
      else {
        const embed = new Discord.MessageEmbed()
          .setColor("#ff4fa7")
          .setAuthor("Yeni video var!", "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg")
          .addField("**Başlık**", videos.items[0].media_group.media_title)
          .addField("**Beğeni Sayısı**", videos.items[0].media_group.media_community.media_starRating_count, true)
          .addField("**Beğeni Ortalaması**", videos.items[0].media_group.media_community.media_starRating_average, true)
          .addField("**Görüntüleme**", videos.items[0].media_group.media_community.media_statistics_views, true)
          .setImage(videos.items[0].media_group.media_thumbnail_url)
          .setFooter("Guild Youtube")
        client.channels.cache.get(ayarlar.channel_id).send(`Merhaba! **${videos.author.name}** yeni video yükledi Like Atmayı Yorum Yapmayı Unutma! @everyone \n\nİzle: https://www.youtube.com/watch?v=${videos.items[0].yt_videoId}`, embed).then(y =>
          vids.push("vid", videos.items[0].link)
        )
      }
    })
  }, 30000);//  setInterval , 60000
})
////
{
  const odb = require("orio.db")
  client.on("clickButton", async button => {

    let dataA = cdb.get(`button_${button.message.id}`)
    if (!dataA) return;

    let emote = {
      başarılı: "✅"
    }

    let data = dataA.filter(cs => cs.id === `${button.id}`).map(veri => {

      let member = button.guild.members.cache.get(button.clicker.user.id)

      button.reply.think(true).then(async a => {

        if (member.roles.cache.has(veri.rol)) {

          a.edit(`> ${emote.başarılı} **Başarılı!** Butona tıkladığın için <@&${veri.rol}> Rolünü senden aldım.`)
          member.roles.remove(veri.rol)

        } else {

          a.edit(`> ${emote.başarılı} **Başarılı!** Butona tıkladığın için <@&${veri.rol}> Rolünü sana verdim.`)
          member.roles.add(veri.rol)

        }

      })
    })
  })
}
///
client.on('message', async (msg) => {

  client.prefixxx = "s.talep"

  if (!msg.content.startsWith(client.prefixxx)) return;
  let args = msg.content.slice(client.prefixxx.length).trim().split(/ +/g)
  let commandName = args.join(' ')
  if (msg.author.bot) return

  let soru = commandName
  if (!soru) return

  ai.sor(soru).then(uwu => {
    var msj = uwu
      .replace("codere.fun", `<@830008975335489567>`)
      .replace("furtsy", `<@830008975335489567>`)
      .replace("Furtsy", `<@830008975335489567>`)
      .replace("CodAre", `<@830008975335489567>`)


    msg.reply(msj)
  }).catch(err => console.log(err))
})

///
//-----------------------DESTEK KAPATMA-----------------------\\
client.on("message", message => {
  if (message.content.toLowerCase() === "s.kapat") {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut ile sadece talep kapatabilirsin.`)
    message.channel.delete()
    db.delete(`destek_${message.author.id}`)
  }
})
//-----------------------DESTEK KAPATMA-----------------------\\

//---------------------TİCKET-Oto msj silme------------------------//

//---------------------TİCKET-Oto msj silme------------------------//

///////////////////////////////// kanala birisi mesaj yazınca emoji ekliyo
client.on('message', async (msg) => {
if (msg.channel.id !== "1010554612593459321") return;//kanal id si buraya
await msg.react('<:tik:1007310699904643163>')//emojileri istediğiniz gibi değiştirebilirsiniz
});