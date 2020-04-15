const Discord = module.require("discord.js");
const moment = require("moment");
const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
  config: {
    name: "whois",
    aliases: ["who", "user", "wh"],
    usage: "!whois @user",
    category: "miscellaneous",
    description: "Display user infos",
    accessibleby: "Members",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
    if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

            const member = getMember(message, args.join(" ")),
      user = member.user;
    const joinDiscord = moment(user.createdAt).format("llll");
    const joinServer = moment(member.joinedAt).format("llll");
    let embed = new Discord.RichEmbed()
      .setAuthor(
        user.username + "#" + user.discriminator,
        user.displayAvatarURL
      )
      .setDescription(`${user}`)
      .setColor(`RANDOM`)
      .setThumbnail(`${user.displayAvatarURL}`)
      .addField(
        "Joined at:",
        `${moment
          .utc(member.guild.joinedAt)
          .format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        false)
      .addField("Status:", user.presence.status, true)
      .addField("\nGame:", user.presence.game  ?user.presence.game : 'none' , false)
      .addField("Roles:", member.roles .filter(r => r.id !== message.guild.id).map(r => `${r}`).join(" | "), true)
      .setFooter(`ID: ${user.id}`)
      .setTimestamp();

    message.channel.send(embed);
    return;
  }
};
