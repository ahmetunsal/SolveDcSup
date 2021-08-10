const moment = require('moment');
const ms = require('ms');
const { Discord, MessageEmbed} = require('discord.js');
require("moment-duration-format");
const db = require('quick.db');
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

    //Açıklamalar
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(' ');
    let jailRole = config.mod.jailRole;
    let time = args[1]
    let jailzaman = ms(`${time}`)
    let measure = db.get(`measurestart_${message.author.id}`) || [];
    let injail = db.get(`thoseinjail_${message.author.id}`) || [];
    let jailLog  = config.jailLog;
    let solvelog = client.guilds.cache.get(config.sunucu.guildID).channels.cache.find(c => c.name === "jail-log")
    /////////////

    //Hazır bir Embed yazısı koyuyoruz işimizin kolaylaşması için.
    const mm = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter("Solve")

    const mn = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    //////////////////////////

    //İf-Else Şartlıyoruz Şöyleyse böyle yap böyleyse şöyle yap gibisinden
    if (!config.mod.jailHam.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
        return message.channel.send(mm.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
    }
    if(!member) return message.channel.send(mm.setDescription(`**Bir kişi etiketlemeniz gerekli!**`))
    if(!reason) return message.channel.send(mm.setDescription(`**Bir sebep belirtmeniz gerekli!**`))
    if(measure.filter(data => (Date.now() - data.time) < 60000).lenght >= 10) {
        message.delete();
        message.member.roles.set(jailRole)
        return injail.forEach(x => {
            message.guild.members.cache.get(x.id).roles.set(x.roller.map(s => s.id));
        })
    }
    /////////////////////////

    //Kanala mesaj gönderiyoruz bilgilendirme için.
    message.channel.send(mm.setDescription(`**Tamamdır!**`, `**${member} üyesi başarıyla ${reason} sebeiyle jaile gönderildi! \n <#${jailLog}> kontrol ediniz.**`).setFooter(`Ayrıntılar için jail-log kanalına bakabilirsiniz`))
    solvelog.send(mm.setDescription(`**Bir kişi Jaile atıldı!**`, `\n **Jaile Atılan Kişi : ${member}** \n **Jaile Atılma Sebebi : ${reason}** \n **Jaile Atan Yetkili : ${message.author}**`))
    ////////////////////////////////////////////

    //Database İşlemleri
    db.push(`${member.id}_sicil`, `**${message.author}** tarafından **${reason}** sebebiyle **${moment().format('LLL')}** tarihinde **${time}** süre boyunca **Jail Cezası** aldı.`)
    db.add(`${message.author.id}_jail`, 1)
    db.set(`xxhub_${member.id}`, member.roles.cache.map(s => s))
    db.push(`thoseinjail_${message.author.id}`, { id: member.id, roller: member.roles.cache.map(s => s) })
    db.push(`measurestart_${message.author.id}`, { time: Date.now() });
    ////////////////////////////////////

    //Kişinin bütün rollerini silip jail rolünü veriyoruz
    member.roles.set(client.config.jailRoles)
    //////////////////


    //Son olarak, Burada bir if bloğu açıp içine jaile attığımız zaman bittikten sonra ne yapacağını yazıyoruz
    if (time) setTimeout(() => {
        member.roles.set(db.get(`xxhub_${member.id}`).map(s => s.id))
        solvelog.send(mm.setTitle('Kullanıcının Cezası Bitti').setDescription(`${member} Adlı Kullanıcının Tahliye Oldu!`))
    }, jailzaman)
}


exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["jailed"], 
    permLevel : 0
}

exports.help = {
    name : 'jail',
    description : '',
    cooldown: 10
}