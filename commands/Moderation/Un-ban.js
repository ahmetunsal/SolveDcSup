const { MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
    

    // Açıklamalar (let)
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let solvelog = client.guilds.cache.get(config.sunucu.guildID).channels.cache.find(c => c.name === "ban-log")
    // Açıklamalar (const)
    const banList = await message.guild.fetchBans();
    ////////////////////////////
    
    // Hazır embed yazıları yazıyoruz işimizin kolaylaşması için
    const mm = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter("Solve")
    //////////////////////////

    //İF-ELSE şart blokları, şartımıza göre komutu renklendiriyoruz
    if (!config.mod.banHam.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
        return message.channel.send(mm.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
    }
    if(!member || isNaN(member) || !banList.has(member)) return message.channel.send(mm.setDescription(`**Kişi id hatalı veya kişi banlı değil!**`))
    ////////////////////////////////////////

    // Kişi ile ilgili ban kaldırma işlemini yapıyoruz
    message.guild.members.unban(member);
    /////////// Banın kaldırıldığına dair mesaj gönderiyoruz 
    message.channel.send(mm.setDescription(`**${member} adlı kullanıcının banı kaldırıldı!**`))
    solvelog.send(mm.setDescription(`**${member} adlı kullanıcının banı kaldırıldı! Banı kaldıran yetkili : ${message.author} **`))
    /////////////////////////

}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ["un-ban"], 
    permLevel : 0
}

exports.help = {
    name : 'unban',
    description : '',
    cooldown: 10
}