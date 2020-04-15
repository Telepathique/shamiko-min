const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = {
  config: {
    name: "seal",
    description: "Sends a picture of a seal!",
    usage: "!seal",
    category: "images",
    type:"images",
    accessableby: "Members",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
    if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

    let msg = await message.channel.send("Generating...");

    fetch("https://apis.duncte123.me/seal")
      .then(res => res.json())
      .then(body => {
        if (!body) return message.reply(" whoops. I broke, try again!");

        let embed = new RichEmbed()
          .setColor(cyan)
          .setAuthor(`${bot.user.username} Seal!`, message.guild.iconURL)
          .setImage(body.data.file)
          .setTimestamp()
          .setFooter(
            bot.user.username.toUpperCase(),
            bot.user.displayAvatarURL
          );

        msg.edit(embed);
      });
  }
};
