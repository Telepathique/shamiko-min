const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json");

module.exports = {
  config: {
    name: "mod Help",
    aliases: ["mh", "mhalp", "mcommands"],
    usage: "!help commandname",
    category: "owner",
    description: "Display help for all available commands",
    accessibleby: "owner",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
    if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

    let arr = [];
    let types = ["Fun", "Moderation", "Miscellaneous", "Owner"];
    let embed = new RichEmbed();

    if (!args[0]) {
      for (let i = 0; i < types.length; i++) {
        arr.push(
          bot.commands
            .filter(c => c.config.category == types[i].toLowerCase())
            .map(c => `\`${c.config.name}\``)
            .join(" ")
        );
        try {
          embed.addField(types[i], arr[i]);
        } catch (e) {
          embed.addBlankField();
        }
      }

      embed
        .setColor(cyan)
        .setAuthor(
          `${message.guild.me.displayName} Help`,
          message.guild.iconURL
        )
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(
          `These are the avaliable commands for Shamiko-Min\nThe bot prefix is: **${prefix}**`
        )
        .setFooter("Shamiko-min", bot.user.displayAvatarURL);
      message.channel.send(embed);
    } else {
      let command = bot.commands.get(args[0].toLowerCase())
        ? bot.commands.get(args[0].toLowerCase()).config
        : bot.commands.get(bot.aliases.get(args[0].toLowerCase())).config;

      embed
        .setColor(cyan)
        .setAuthor(
          `${message.guild.me.displayName} Help`,
          message.guild.iconURL
        )
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(
          `The bot prefix is: ${prefix}\n\n**Command:** ${
            command.name
          }\n**Description:** ${command.description ||
            "No Description"}\n**Usage:** ${command.usage ||
            "No Usage"}\n**Accessible by:** ${command.accessibleby ||
            "Members"}\n**Aliases:** ${
            command.aliases ? command.aliases.join(", ") : "None"
          }`
        );
      message.channel.send(embed);
    }
  }
};
