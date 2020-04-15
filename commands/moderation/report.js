const { RichEmbed } = require("discord.js");
const { purple_dark } = require("../../colours.json");

module.exports = {
  config: {
    name: "report",
    description: "reports a user of the guild",
    usage: "!report <user> <reason>",
    category: "moderation",
    aliases: ["warn", "rep", "r"],
    accessibleby: "Members",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
    let target =
      message.mentions.members.first() || message.guild.members.get(args[0]);

    let sChannel1 = message.guild.channels.find(x => x.name === "reports");

    // mentioned or grabbed user

    if (!target)
      return message.channel
        .send("Please provide a valid user")
        .then(m => m.delete(15000));

    // reasoning definition
    let reason = args.slice(1).join(" ");
    if (!reason)
      return message.channel
        .send(`Please provide a reason for reporting **${target.user.tag}**`)
        .then(m => m.delete(15000));

    // grab reports channel
    let sChannel = message.guild.channels.find(x => x.name === "reports");

    // send to reports channel and add tick or cross
    let embed = new RichEmbed()
      .setColor(purple_dark)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "report")
      .addField("Reported user:", target.user.username)
      .addField("Reported user ID:", target.user.id)
      .addField("User that have reported abuse :", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    message.channel
      .send("Your report has been filed to the staff team. Thank you!")
      .then(m => m.delete(15000));
    sChannel.send(embed).then(async msg => {
      await msg.react("✅");
      await msg.react("❌");
    });
  }
};
