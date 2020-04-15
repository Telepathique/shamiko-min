const Discord = require('discord.js');
const mongoose = require('mongoose');
const Market = require('../../mongodb/market.js');
 

module.exports = {
  config:{
    name: 'delitem',
    description: 'Remove an item from the market',
    usage: 'remove an item',
    aliases: ["delete","ritem"],
    category: "currency",
    accessableby: "Moderator",
    cooldowns: 60*12,
  },
    async run(bot,  message, args) {

    if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You dont have permission to perform this command!"
      );
             message.channel.send('Please Give me the name the item you want to modify');
          const m = await message.channel.awaitMessages(m =>m.author.id == message.author.id, m.content,{ max: 1,  time: 60000, errors: ['time']})
       const itemname= m.last();
            Market.findOneAndDelete({
                serverID: message.guild.id,
                itemName: itemname,
            }, (err, market) => {
                if (err) console.error(err);
                  return message.channel.send(`Congratulation ${message.author.username}, you just Deleted ${itemname}`)
                }
            );
    }
};