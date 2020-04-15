const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
  config: {
    name: "rock paper scissor",
    aliases: ["rps", "rockpaperscissor"],
    category: "fun",
    description:
      "Rock Paper Scissors game. React to one of the emojis to play the game.",
    usage: "!rps",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
        if (bot.Disabled === true)
      return message.channel
        .send("Sorry this command is under maintenance  ")
        .then(m => m.delete(15000));

    const embed = new RichEmbed()
      .setTitle("🗻 📰 ✂ RPS  ✂ 📰 🗻")
      .setColor("RANDOM")
      .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
      .setDescription("Add a reaction to one of these emojis to play the game!")
      .setTimestamp();

    const m = await message.channel.send(embed);
    const reacted = await promptMessage(m, message.author, 30, chooseArr);

    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    const result = await getResult(reacted, botChoice);
    await m.clearReactions();

    embed.setDescription("").addField(result, `${reacted} vs ${botChoice}`);

    m.edit(embed);

    function getResult(me, clientChosen) {
      if (
        (me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")
      ) {
        return "You won!";
      } else if (me === clientChosen) {
        return "It's a tie!";
      } else {
        return "You lost!";
      }
    }
  }
};
