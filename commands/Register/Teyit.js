const { Discord, MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");

exports.run = async(client, message, args) => {
    
    var member = message.mentions.users.first() || message.author;
    let erkek = db.get(`boy_${member.id}`) || 0
    let kız = db.get(`girl_${member.id}`) || 0
    let toplam = db.get(`total_${member.id}`) || 0
    const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle("Kayıt Bilgisi")
        .setDescription(`Sunucudaki Toplam Teyit Sayın: \`${toplam}\` (Erkek: ${erkek} || Bayan: ${kız})`)
    message.channel.send(embed)
    
}


exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["t", "teyitlerim", "teyidim"], 
    permLevel : 0
}

exports.help = {
    name : 'teyit',
    description : 'teyit @member/id (Kisi etiketlemezseniz kendiniz cıkarsınız.)',
    cooldown: 10
}



