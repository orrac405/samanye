const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../ayarlar.json')

module.exports = client => {
  var degisenOynuyor = [

    "Senpai Deneme sürümü yayında"

  ]


  setInterval(function() {
    var degisenOynuyor1 = degisenOynuyor[Math.floor(Math.random() * (degisenOynuyor.length))]
    client.user.setActivity(`${degisenOynuyor1}`);
    console.log(`${client.user.username} olarak bağlandım.`)
  }, 2 * 30000);

  client.user.setStatus("dnd"); //dnd, idle, online, offline

}