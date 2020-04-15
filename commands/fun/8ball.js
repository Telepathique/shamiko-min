const { RichEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "8ball",
    aliases: ["8", "magicb", "ball", "8b"],
    category: "fun",
    usage: "!blackjack and after use the emoji to play",
    description: "starts a game of blackjack with the user",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
        if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

    function doMagic8BallVoodoo() {
      const rand = [
        " Absolutly.",
        " Absolutly not.",
        "It is true.",
        " Impossible.",
        " Of course.",
        " I don't think so.",
        " It is true.",
        " It is not true.",
        " I am very undoubtful of that.",
        " I am very doubtful of that.",
        " Sources point to no.",
        " Theories prove it.",
        " Reply hazy try again",
        " Ask again later",
        " Better not tell you now",
        " Cannot predict now",
        " Concentrate and ask again"
      ];

      return rand[Math.floor(Math.random() * rand.length)];
    }
    const result = await doMagic8BallVoodoo();
    let question = args.join(" ");
    if (!question) {
      message.channel.send("please ask a question to play the game");
    } else {
      const heightballembeed = new RichEmbed()
        .setTitle("🎱 magic ball 🎱")
        .setColor("RANDOM")
        .addField("You asked the :8ball: for :", `${question}`)
        .addField("The ball start blinking and the answer is... ", `${result}`)
        .setTimestamp();

      await message.channel.send(heightballembeed);
    }
  }
};
