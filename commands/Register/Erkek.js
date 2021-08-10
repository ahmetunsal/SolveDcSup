const { Discord, MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");
exports.run = async(client, message, args) => {

    let member = message.mentions.users.first() || (args[0] ? await message.guild.getMember(args[0]) : undefined);
    let erkekRole = config.erkekRole;
    let unregister = config.unregister;
    let name = args[1]
    let age = Number(args[2]);
    
    const mm = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter("Solve")

    if(!member) return message.channel.send(mm.setDescription('**Öncelikle bir kişi etiketlemelisin!**'));
    if(!name) return message.channel.send(mm.setDescription('**Bir isim girmelisin!**'));
    if(!age) return message.channel.send(mm.setDescription('**Bir yaş girmelisin!**'));
    if(!message.member.hasPermission("ADMINISTRATOR") && !config.register.registerian.some(role => message.member.roles.cache.has(role))) return message.channel.send(mm.setDescription("**Yeterli yetkiniz bulunmamakta**"));

    message.channel.send(mm.setDescription(`**${member} başarıyla kaydedildi! \n Kayıtta Verilen Rol : <@${erkekRole}> \n Kayıtta Alınan Rol : <@${unregister}> \n Kayıt İşleminde Verilen İsim:** \`${name} | ${age}\` `))
    db.push(`names_${member.id}`, ` ${name} | ${age} (E)`)
    db.add(`boy_${message.author.id}`, 1)
    db.add(`total_${message.author.id}`, 1)
    await message.guild.members.cache.get(member.id).roles.remove(unregister)
    await message.guild.members.cache.get(member.id).roles.add(erkekRole)
    message.guild.members.cache.get(member.id).setNickname(`${config.register.tag} ${name} | ${age}`)


    client.channels.cache.get(config.register.log).send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("GREEN").setDescription(`Bir kişi kayıt oldu!`, `Kayıt edilen kişi : ${member} \n Kayıt sırasında verilen rol: <@${erkekRole}> \n Kayıt sırasında alınan rol : <@${unregister}> \n Kayıt sırasında ayarlanan isim : \`${name} | ${age}\` `))
    member.send(`**${member} sunucumuza hoşgeldin! Seninle beraber ${member.guild.memberCount} kişiyiz! <#${config.channellar.rules}> kanalından kurallarımızı okuyabilirsin.** \n **Dikkat!** **Yaptığın herhangi bir** *Kötü*  davranışta bu kurallar üzerinden cezan verilecek. İyi Eğlenceler!`)
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["e", "erkek", "erkk"], 
    permLevel : 0
}

exports.help = {
    name : 'erkek',
    description : 'erkek @member/id İsim Yas',
    cooldown: 10
}