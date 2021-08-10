const { MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {


    //Açıklamalar
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    
    //////

    
    //Hazır bir Embed yazısı koyuyoruz işimizin kolaylaşması için.
    const mm = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter("Solve")

    const mn = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    //////////////////////////
     

    //İF-ELSE şart blokları
    if(!member) return message.channel.send(mm.setDescription(`**Bir kişi etiketlemelisin!**`))
    if (!db.get(`xxhub_${member.id}`)) return message.channel.send(embed.setDescription("Bu Kullanıcıda Mute Cezası Yok!"))
    if (!config.mod.banHam.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
        return message.channel.send(mm.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
    }
    /////////////////////////

    // Rolleri ayarlıyoruz
    member.roles.set(db.get(`xxhub_${member.id}`).map(s => s.id))

    // Kanala Mesaj Gönderiyoruz
    message.channel.send(embed.setDescription(`${member} adlı kullanıcı mute cezası bitti.`))
    message.guild.channels.cache.get(config.mod.muteLog).send(embed.setDescription(`${message.author} adlı yetkili tarafından ${member} adlı kullanıcının mutesi kaldırıldı!`))
    ////////////////////


}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["unmuter", "un-mute"], 
    permLevel : 0
}

exports.help = {
    name : 'unmute',
    description : '',
    cooldown: 10
}