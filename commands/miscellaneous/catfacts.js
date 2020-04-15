const request = require('superagent');
const { RichEmbed } = require("discord.js");
const { purple_light } = require("../../colours.json");

module.exports = {
  config:{
    name: 'cat-facts',
    aliases: ["cats", "cat-life", "cat-tips", "cat"],
    category: "Miscellaneous",
    accessableby: "Members",
    usage: "!advice",
    description: "Send some coole life advices",
    Disabled: false,
    cooldowns: 3,
  },

    run (bot, message, args,) {
        request.get('https://catfact.ninja/fact').end((err, res) => {
            if (!err && res.status === 200) {
           
                    const catembed = new RichEmbed()
      .setTitle("Cat-Facts")
      .setColor("RANDOM")
      .setDescription(
          res.body.fact
      )
      .setTimestamp();
     message.channel.send(catembed)
            } 
            else {
                console.log(`REST call failed: ${err}`);
            }
        });
    },
};
