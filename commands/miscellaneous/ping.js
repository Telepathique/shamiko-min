module.exports = {
  config: {
    name: "ping",
    description: "PONG! Displays the api & bot latency",
    usage: "!ping",
    category: "miscellaneous",
    accessibleby: "Members",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
    if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

    message.channel.send("Pinging...").then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp;
      let choices = [
        "Is this really my ping",
        "Is it okay? I cant look",
        "I hope it isnt bad"
      ];
      let response = choices[Math.floor(Math.random() * choices.length)];

      m.edit(
        `${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(
          bot.ping
        )}\``
      );
    });
  }
};
