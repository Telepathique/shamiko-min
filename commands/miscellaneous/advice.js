const request = require('superagent');
const { RichEmbed } = require("discord.js");
const { purple_light } = require("../../colours.json");

module.exports = {
  config:{
    name: 'advice',
    aliases: ["clue", "life", "tips", "lt"],
    category: "Miscellaneous",
    accessableby: "Members",
    usage: "!advice",
    description: "Send some coole life advices",
    Disabled: false,
    cooldowns: 0,
  },
    run(bot, message, args) {
        request
            .get('http://api.adviceslip.com/advice')
            .end((err, res) => {
                if (!err && res.status === 200) {
                    try {
                        JSON.parse(res.text)
                    } catch (e) {
                        return message.reply(', an api error occurred.');
                    }
                    const advice = JSON.parse(res.text)
                    const adviceembed= new RichEmbed()
      .setTitle("Life tips")
      .setColor(purple_light)
      .setDescription(
          advice.slip.advice
      )
      .setTimestamp();

                    message.channel.send(adviceembed)
                } else {
                console.error(`REST call failed: ${err}, status code: ${res.status}`)
                }
            });
    },
};