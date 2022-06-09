const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

exports.run = async (client, message, args) => {

const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("yardım")
      .setPlaceholder('Yardım Menüsüne Hoşgeldin!')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
       
 
        {
          label:"| Moderasyon" ,
          description:"Moderasyon Komutlarını Görürsün!",
          value:"moderasyon",
          emoji:"emoji id girin"
        },
        {
          label:"Kullanıcı",
          description:"Kullanıcı komutlarını görürsün!",
          value:"kullanıcı",
          emoji:"emoji id girin"
        }
      
        
        ])
      )
    
    let embed = new MessageEmbed()
.setTitle("Yardım Menüsü")
.setDescription("Yardım Menüsüne Hoşgeldin!")
.setColor("RANDOM")
.setImage("resim link girin")  
message.channel.send({embeds: [embed], components: [row]})

}

module.exports.conf = {
  aliases: []
}

  module.exports.help = {
    name: "yardım"
  }