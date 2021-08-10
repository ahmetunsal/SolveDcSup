const { Discord, MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");

exports.run = async(client, message, args) => {
    let member = member.mentions.users.first() || (args[0] ? await message.guild.getMember(args[0]) : undefined);
    let name = args[1];
    let age = Number(args[2]);

    
    const mm = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter("Solve")



    if(!member) return message.channel.send(mm.setDescription(`**Bir kişi etiketlemelisiniz!**`));
    if(!name) return message.channel.send(mm.setDescription(`**Bir isim girmelisin!**`));
    if(!age) return message.channel.send(mm.setDescription(`**Bir yaş girmelisin!**`));
    if(!config.register.registerian.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(mm.setDescription(`**Yeterli yetkiniz bulunmamakta!**`));

    message.channel.send(mm.setDescription(`**Tamamdır!**`, `**Kişinin ismi başarıyla** \`${name} | ${age}\` **olarak değiştirildi!**`))
    message.guild.members.cache.get(member.id).setNickname(`${config.register.tag} ${name} | ${age}`)
    db.push(`names_${member.id}`, ` \`${name} | ${age}\` (İsim Değiştirme)`);
}


exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["i", "isim", "isimle"], 
    permLevel : 0
}

exports.help = {
    name : 'isim',
    description : 'isim @member/id İsim Yas',
    cooldown: 10
}