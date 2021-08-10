const { MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
moment.locale("tr")

exports.run = async(client, message, args) => {

    // Açıklamalar 
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ')
    
    // Hazır embed yazıları yazıyoruz işimizin kolaylaşması için
    const mm = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter("Solve")

    //İF-ELSE şart blokları, şartımıza göre komutu renklendiriyoruz
    if (!config.mod.banHam.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
        return message.channel.send(mm.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
    }
    if(!member) return message.channel.send(mm.setDescription(`**Bir kişi etiketlemelisiniz!**`))
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(mm.setDescription(`**Sizden yüksek veya aynı yetkide birisini banlayamazsınız!**`))
    if(!reason) return message.channel.send(mm.setDescription(`Bu kişiyi banlamak için bir sebebiniz olmalı!`))
    
    message.channel.send(mm.setDescription(`Emredersiniz efendim!`, `**${member} başarıyla** **${reason}** **sebebiyle banlandı!**`).setImage("https://cdn.discordapp.com/attachments/819671433348513822/874606163960930335/kedy.gif"))
    message.guild.members.ban(member.id, { reason: `Yetkili: ${message.author} || Sebep ${reason}}` })
    member.send(mm.setDescription(`**${message.author} tarafından ${reason} sebebiyle ${member.guild.name} sunucusundan banlandın!** [İtiraz Ediyorum!])(https://discord.com/users/852804973183500329)`))
    db.add(`${message.author.id}_ban`, 1)
    db.push(`${member.id}_sicil`, ` \`[BAN]\` ${message.author} tarafından **${reason}**  sebebiyle **${moment().format('LLL')}** tarihinde sunucudan **banlandı**.`)
    db.push(`${message.author.id}_banlıüyelers`, { id: member.id })
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["ban", "vur"], 
    permLevel : 0
}

exports.help = {
    name : 'ban',
    description : '',
    cooldown: 10
}