const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const snekfetch = require('snekfetch');

module.exports = {
  config: {
    name: "dogs",
    description: "Sends a picture of a dog!",
    usage: "!dogs",
    category: "images",
    type:"images",
    accessableby: "Members",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {

    let fetch = "https://dog.ceo/api/breeds/image/random";
      let msg = await message.channel.send('Generating...');

        let file = (await snekfetch.get(fetch)).body.message;

        if (!file) {
            return message.channel.send('I am broken, please try again!');
        }
  
        await message.channel.send({ files: [
            {
                attachment: file,
                name: file.split('/').pop(),
            },
        ] });

        console.log(file);
        msg.delete();
    },
};
