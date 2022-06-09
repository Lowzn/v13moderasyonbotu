const { MessageEmbed } = require("discord.js")
const { prefix } = require("../config.json")
exports.run = async(client, message, args) => {
    if(!args[0]) args[0] = message.author.id
    let member = args[0].toString().replace(/[+<+@+!+>]/g, "")
    if(isNaN(member)) return message.reply({content: `**Doğru kullanım:** \`${prefix}banner @etiket/id\``}).then(msg => {setTimeout(() => {msg.delete()}, 5000)})
    client.users.fetch(member, {cache: false, force: true}).then(x => {
        if(x.banner !== null) {
            const embed = new MessageEmbed()
            .setAuthor({name: x.tag, iconURL: x.avatarURL({dynamic: true})})
            .setTitle("Banner link!")
            .setURL(x.bannerURL({dynamic: true, size: 4096}))
            .setColor(x.hexAccentColor)
            .setImage(x.bannerURL({dynamic: true, size: 4096}))
            .setFooter({text: `${message.author.tag} tarafından istendi!`, iconURL: message.author.avatarURL({dynamic: true})})
            .setTimestamp()
            message.reply({embeds: [embed]})
        } else if(x.accentColor !== null) {
            const embed = new MessageEmbed()
            .setAuthor({name: x.tag, iconURL: x.avatarURL({dynamic: true})})
            .setColor(x.hexAccentColor)
            .setDescription(`<@!${x.id}>**(${x.tag})** Adlı Kullanıcının Banneri Yok!.\nAfiş Rengi: \`${x.hexAccentColor}\``)
            .setFooter({text: `${message.author.tag} tarafından istendi!`, iconURL: message.author.avatarURL({dynamic: true})})
            .setTimestamp()
            message.reply({embeds: [embed]})
        } else return message.reply({content: `\`${x.tag}\` Adlı Kullanıcının Banner ve Afişini Bulamadım!`}).then(msg => {setTimeout(() => {msg.delete()}, 5000)})
    })
}
exports.conf = {
    aliases: [],
},
exports.help = {
    name: "banner"
}