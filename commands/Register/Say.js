const { MessageEmbed } = require("discord.js");
const config = require('../config.json')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
    
    const datas = config.register.erkekRole;
    const datass = config.register.kizRole;

    let emotoplamüye = message.guild.members.cache.size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
    let emoaktifüye = message.guild.members.cache.filter(a => a.presence.status !== 'offline').size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
    let emosesaktif = message.guild.members.cache.filter(a => a.voice.channel).size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
    let emoboost = message.guild.premiumSubscriptionCount.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
    let emokadınüyesayısı = message.guild.members.cache.filter(a => a.roles.cache.has(datass)).size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
    let emoerkeknüyesayısı = message.guild.members.cache.filter(a => a.roles.cache.has(datas)).size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
    
    
    let tag = message.guild.members.cache.filter(a => a.user.username.includes(config.register.tag)).size;
    let erkeknüyesayısı = message.guild.members.cache.filter(a => a.roles.cache.has(datas)).size;
    let kadınüyesayısı =message.guild.members.cache.filter(a => a.roles.cache.has(datass)).size;
    let boost = message.guild.premiumSubscriptionCount;
    let toplamüye =  message.guild.members.cache.size;
    let aktifüye = message.guild.members.cache.filter(a => a.presence.status !== 'offline').size;
    let sesaktif =  message.guild.members.cache.filter(a => a.voice.channel).size;
    let boostlevel = message.guild.premiumTier
    let etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == config.register.etag).size;


    message.channel.send(new Discord.MessageEmbed()
    .setAuthor(`Sunucu Durumu`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setDescription(`\`\`\`\`\`\`
    **Toplam Üye** ${toplamüye}
    **Aktif Üye** ${aktifüye}
    **Seslide ki Üye Sayısı** ${sesaktif}
    **Taglı Üye Sayısı** ${tag}
    **Etiket tagındaki üye sayısı** ${etiket}
    **Toplam tag alan üye sayısı** ${etiket + tag}
    **Boost Sayısı** ${boost}
    **Boost Seviyesi** ${boostlevel}
    **Kadın Üye Sayısı** ${kadınüyesayısı}
    **Erkek Üye Sayısı** ${erkeknüyesayısı}`));

}


//message.guild.members.cache.filter(a => a.user.username.includes













/*

let toplamüye = message.guild.members.cache.size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
let aktifüye = message.guild.members.cache.filter(a => a.presence.status !== 'offline').size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
let sesaktif = message.guild.members.cache.filter(a => a.voice.channel).size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
let boost = message.guild.premiumSubscriptionCount.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
let kadınüyesayısı = message.guild.members.cache.filter(a => a.roles.cache.has(datass)).size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
let erkeknüyesayısı = message.guild.members.cache.filter(a => a.roles.cache.has(datas)).size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');

let tag;
if(!data.fetch(`tag.${message.guild.id}`)) {
tag = '0️⃣';
} else {
tag = message.guild.members.cache.filter(a => a.user.username.includes(data.fetch(`tag.${message.guild.id}`))).size.toString().replace('0', '0️⃣').replace('1', '1️⃣').replace('2', '2️⃣').replace('3', '3️⃣').replace('4', '4️⃣').replace('5', '5️⃣').replace('6', '6️⃣').replace('7', '7️⃣').replace('8', '8️⃣').replace('9', '9️⃣');
}

message.channel.send(new Discord.MessageEmbed()
.setAuthor(`Sunucu durumunu istedi: ${message.author.tag}`, message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png')
.setThumbnail(images.random())
.setDescription(`\`\`\`[${client.ayarlar.prefix}tag] ile taglı sayını ayarlayabilirsin.\`\`\`
**Toplam Üye** ${toplamüye}
**Aktif Üye** ${aktifüye}
**Seslide ki Üye Sayısı** ${sesaktif}
**Taglı Üye Sayısı** ${tag}
**Boost Sayısı** ${boost}
**Kadın Üye Sayısı** ${kadınüyesayısı}
**Erkek Üye Sayısı** ${erkeknüyesayısı}`));




*/