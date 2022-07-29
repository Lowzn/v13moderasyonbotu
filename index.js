const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;


const token = "token gir!"
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});
module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

if(!token){
  console.log("Bu Proje Nova Botlist Sunucusuna Özel Yapılmıştır!")
} else { 
client.login(token).catch(e => {
  console.log("Projeye Yazılan Token Hatalı veya Discord Botunuzun Intentleri Kapalı!")
})
}


client.on("interactionCreate", async (interaction, message) => {
    const dc = require("discord.js")
    try {
    if(!interaction.isSelectMenu()) return
    
    if(interaction.customId === "yardım") {
      
      let message = await interaction.channel.messages.fetch(interaction.message.id)
      let value = interaction.values
      
      if(value[0] === "moderasyon") {
        await interaction.deferUpdate()
        
        const embed = new dc.MessageEmbed()
        .setTitle("Moderasyon Komutları!")
    .setDescription(`${prefix}ban - Kullanıcıyı Sunucudan Yasaklar!\n${prefix}kick - Belirtilen Kullanıcıyı Sunucudan Atar!\n${prefix}oylama - Oylama Açarsın!`) 
        .setColor('RED')
        .setTimestamp()
        .setFooter("Moderasyon")
        
        await message.edit({embeds: [embed]})
        
      } else if(value[0] === "kullanıcı") { 
        await interaction.deferUpdate()
        
        const embed = new dc.MessageEmbed ()
      .setTitle("Kullanıcı Komutlarım!")
    .setDescription("${prefix}banner - Belirtilen Kullanıcının Bannerini Verir!\n${prefix}avatar - Belirtilen Kullanıcının Avatarını Verir!")
        .setColor('RED')
        .setTimestamp()
        .setFooter("Kullanıcı Komutları!")
        await message.edit({embeds:[embed]})
        }
      
    }
    
    // if error
    } catch(e) {
      console.error(e)
      interaction.followUp({content: e.message, ephemeral: true})
    }
  })


