const Discord = require('discord.js')

    exports.run = (client, message, args) => {
        if (!message.member.permissions.has("KICK_MEMBERS")){
            const novayetkinyok = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Kick komudunu kullanmak için yeterli yetkiye sahip değilsin.**`)
            .setColor('#ff0000')
            
            
            return message.reply({embeds:[novayetkinyok]})
        }

        let kullanici = message.mentions.members.first();
        let sebep = args.slice(1).join(' ');

        if(!kullanici){
            const kullanicihata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Kicklenecek kişiyi etiketlemen gerekiyor.**`)
            .setColor('#ff0000')
            return message.channel.send({embeds:[kullanicihata]})
        }
        if(!sebep){
            const sebephata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Lütfen sebep belirt.**`)
            .setColor('#ff0000')
            return message.channel.send({embeds:[sebephata]})
        }

        if(kullanici && sebep){
            kullanici.kick()

            const kick =  new Discord.MessageEmbed()
            .setDescription(`${kullanici} Kullanıcısı ${message.author} Tarafından **${sebep}** Sebebiyle Sunucudan Kicklendi, Umarım Aynı Davranışları Tekrar Yapmaz.`)
            .setAuthor(`${message.author.username} - Başarılı Kick`, message.author.avatarURL({dynamic: true}))
            .setColor('RANDOM');
            message.channel.send({embeds:[kick]})
        }
    }

exports.conf = {
    aliases: ['KİCK','Kick','at','At']
}

exports.help = {
    name: 'kick'
}