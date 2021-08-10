const { MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

    //Not : Niwren'den alınmış ve düzenlenmiştir.

    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let isimler = db.get(`isimler_${member.user.id}`);

    
    if (!config.register.registerian.some(id => message.member.roles.cache.has(id))) {
        return message.react('⚠️')
    }

    if (!member) return message.channel.send("Öncellikle Bir Kullanıcı Belirtmelisin.")
    if (!isimler) return message.channel.send("Bu Kullanıcının Daha Öncedenki İsmi Bulunmuyor.")

    const embed = new MessageEmbed()
            .setColor('#2F3136')
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setFooter('Solve')
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
    
    message.channel.send(embed)

}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["isimlers", "isims", "isi"], 
    permLevel : 0
}

exports.help = {
    name : 'isimler',
    description : 'isimler @member/id',
    cooldown: 10
}