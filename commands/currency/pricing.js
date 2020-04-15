const Discord = require('discord.js');
const mongoose = require('mongoose');
const Market = require('../../mongodb/market.js');
 

module.exports = {
  config:{
    name: 'pricing',
    description: 'Make your brain work to gain money',
    usage: 'Daily work',
    aliases: ["setprice","price"],
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
          const m = await message.channel.awaitMessages(m => m.content,{ max: 2,  time: 60000, errors: ['time']})
       const itemname= m.last();
        
      message.channel.send("please give me the price that you want to give to this item")
       const m1 = await message.channel.awaitMessages(m1 => m1.content, { max: 2,  time: 60000, errors: ['time']})
       console.log(` ${m1.content}`);
const newprice = m1.last();
            
        if (isNaN(newprice)) {
            return message.reply('Please provide a valid price for the new item!');
        }
else
            Market.findOneAndUpdate({
                serverID: message.guild.id,
                itemName: itemname,
            }, {price: newprice}, (err, market) => {
                if (err) console.error(err);
                  return message.channel.send(`Congratulation ${message.author.username}, you just upgraded ${itemname} price to ${newprice}`)
                }
            );
    }
};