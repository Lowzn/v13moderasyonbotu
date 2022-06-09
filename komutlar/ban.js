const Discord = require("discord.js");


module.exports = {
    calistir: async(client, message, args) => {


        if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Bu komutu kullanabilmek için **Üyeleri Yasakla** yetkisine sahip olman gerekir!")


        let user = message.mentions.users.first();




        if(!user) return message.channel.send("Lütfen banlicağın kişiyi etiketle!")




const üye = message.guild.members.cache.get(user.id)


üye.ban()




const ban = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`${user}, isimli kişi başarılı bir şekilde sunucudan yasaklandı!`)
.setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzh1dL6eat0r9ouQR4_w8e1ffkYv5bugDMwf-HDc8wOHm3014UiUCnGjfyWwYcOS3JDJQ&usqp=CAU")



message.channel.send({embeds:[ban]})




},


name: "ban",
description: "",
aliases: [],
usage: "ban"
}
