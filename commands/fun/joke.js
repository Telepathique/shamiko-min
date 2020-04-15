const request = require('superagent');
const { RichEmbed } = require("discord.js");
const { purple_light } = require("../../colours.json");

module.exports = {
  config:{
    name: 'joke',
    aliases: [ "lol", "", "jk"],
    category: "fun",
    usage: "!joke @nickname + memename",
    description: "Send a joke",
    Disabled: false,
    cooldowns: 0,
  },
 run(bot, message, args) { 
        let firstName = args[0];
        let lastName = args[1];

        if (!firstName) firstName = 'Supreme';
        if (!lastName) lastName = '.';

        request.get('http://api.icndb.com/jokes/random')
            .query({escape: 'javascript'})
            .query({firstName: firstName})
            .query({lastName: lastName})
            .end((err, res) => {
                if (!err && res.status === 200) {
                  const jokeembed = new RichEmbed()
      .setTitle("Joke about you")
      .setColor("RANDOM")
      .setDescription(
          res.body.value.joke
      )
      .setTimestamp();
                        message.channel.send(jokeembed)
                } else {
                    console.error(`REST call failed: ${err}`)
                }
            });
    }

}