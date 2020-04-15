const { ownerid } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "shutdown",
    description: "shuts down the bot!",
    usage: "!shutdown",
    category: "owner",
    type: "Owner",
    accessibleby: "Bot Owner",
    aliases: ["botstop", "bye", "reset", "stop", "sd"],
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
    if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

    if (
      message.author.id != process.env.ownerid &&
      message.author.id != process.env.subowner
    )
      return message.channel.send("You're the bot the owner!");

    try {
      await message.channel
        .send("Refreshing the bot.")
        .then(msg => msg.delete(5000));
      process.exit();
      process.exit();
      process.exit();
      process.exit();
    } catch (e) {
      message.channel.send(`ERROR: ${e.message}`);
    }
  }
};
