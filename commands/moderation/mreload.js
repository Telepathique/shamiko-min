module.exports = {
  config: {
    name: "mreload",
    description: "reloads a bot command!",
    usage: "!reload",
    category: "owner",
    type: "Owner",
    accessibleby: "Bot Owner",
    aliases: ["mcreload", "mr"],
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
   if (
      message.author.id != process.env.ownerid &&
      message.author.id != process.env.subowner
    )
      return message.channel.send("You're the bot the owner!");

    if (!args[0])
      return message.channel.send("Please provide a command to reload!");

    let commandName = args[0].toLowerCase();

    try {
      delete require.cache[require.resolve(`./${commandName}.js`)]; // usage !reload <name>
      bot.commands.delete(commandName);
      const pull = require(`./${commandName}.js`);
      bot.commands.set(commandName, pull);
    } catch (e) {
      return console.error(e);
      return message.channel.send(
        `Could not reload: \`${args[0].toUpperCase()}\``
      );
    }

    message.channel.send(
      `The command \`${args[0].toUpperCase()}\` has been reloaded!`
    );
  }
};
