const request = require('superagent');
const { RichEmbed } = require("discord.js");
const { purple_light } = require("../../colours.json");

module.exports = {
  config:{
    name: 'dog-facts',
    aliases: ["dog", "dog-life", "dog-tips", "Dog"],
    category: "Miscellaneous",
    accessableby: "Members",
    usage: "!dog",
    description: "Send some cools dog facts",
    Disabled: false,
    cooldowns: 3,
  },

    run (bot, message, args,) {
request.get('https://dog-api.kinduff.com/api/facts').end((err, res) => {
            if (!err && res.status === 200) {
          const dogembed = new RichEmbed()
      .setTitle("Dog-Facts")
      .setColor("RANDOM")
      .setDescription(
          res.body.facts[0]
      )
      .setTimestamp();
     message.channel.send(dogembed)
          
              
            } else {
                console.log(`REST call failed: ${err}`)
            }
        });
    }
}