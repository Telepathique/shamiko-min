const Discord = module.require("discord.js");
const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");

module.exports = {
  config: {
    name: "uptime",
    description: "Info for bot uptime",
    usage: "!uptime",
    category: "miscellaneous",
    accessibleby: "Members",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
    let choices = [
        "Is this really my upti?me",
        "Is it okay? I cant look",
        "I hope it isnt bad"
      ];
      let response = choices[Math.floor(Math.random() * choices.length)];

  let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`;
  
    
    let uptimeembed = new Discord.RichEmbed()
    .setColor(cyan)
        .setAuthor(
          `${message.guild.me.displayName} Uptime`,
          message.guild.iconURL
        )
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        
        .addField(`${response}`, ` ${uptime}`
        )
        .setFooter("Shamiko-min", bot.user.displayAvatarURL);
       await  message.channel.send(uptimeembed)

  }
};