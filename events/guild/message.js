const { RichEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");
const config = require('../../mongodb/schema.js');
const Coins = require('../../mongodb/money.js');
module.exports = async (bot, message) => {
  
      config.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err);

        let prefix = guild.prefix;
        let args = message.content.slice(prefix.length).trim().split(' ');
        let cmd = args.shift().toLowerCase();
        let command;

  if (message.author.bot || message.channel.type === "dm") return;
  
  if (!message.content.startsWith(prefix)) return;
  let commandfile =
    bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
   if (commandfile) commandfile.run(bot, message, args);
})

};