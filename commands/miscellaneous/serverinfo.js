const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const moment = require("moment");

module.exports = {
  config: {
    name: "serverinfo",
    description: "Pulls the serverinfo of the guild!",
    usage: "!serverinfo",
    category: "miscellaneous",
    accessibleby: "Members",
    aliases: ["si", "serverdesc"],
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
    if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

    let sEmbed = new RichEmbed()
      .setColor(cyan)
      .setTitle("Server Info")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
      .addField("**Guild Name:**", `${message.guild.name}`, true)
      .addField("**Guild Owner:**", `${message.guild.owner}`, true)
      .addField(
        "Created at:",
        `${moment
          .utc(message.guild.createdAt)
          .format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        true
      )
      .addField("**Member Count:**", `${message.guild.memberCount}`, true)
      .addField("**Role Count:**", `${message.guild.roles.size}`, true)
      .setFooter(`Shamiko-min | Footer`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
  }
};
