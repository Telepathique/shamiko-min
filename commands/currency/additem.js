const { RichEmbed } = require("discord.js");
const fs = require('fs');
const utility = require('../../utility.js');
const mongoose = require('mongoose');

const Money = require('../../mongodb/money.js');
const Market = require('../../mongodb/market.js');

module.exports = {
  config:{
    name: 'additem',
    description: 'Set a new item on the market',
    usage: '!additem name price',
    aliases: ["set_price", "promo",],
    category: "currency",
    accessableby: "Moderator",
    cooldowns: 0,
  },
async run (bot,  message, args){
    if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You dont have permission to perform this command!"
      );
             message.channel.send('Please Give me the name the item you want to add');
          const m = await message.channel.awaitMessages(m =>m.author.id === message.author.id || m.content,{ max: 1,  time: 60000, errors: ['time']})
       const newitem= m.last();
        
      message.channel.send("please give me the price that you want to give to this item")
       const m1 = await message.channel.awaitMessages(m1 =>m.author.id === message.author.id || m1.content, { max: 1,  time: 60000, errors: ['time']})
const newprice = parseInt(m1.last());

            
        if (isNaN(newprice)) {
            return message.reply('Please provide a valid price for the new item!');
        }
  message.channel.send("please give me the ID that you want to give to this item")
       const m2 = await message.channel.awaitMessages(m2 => m.author.id === message.author.id || m2.content, { max: 1,  time: 60000, errors: ['time']})
       
const itemid = parseInt(m2.last());

            
        if (isNaN(newprice)) {
            return message.reply('Please provide a valid price for the new item!');
        }
const    newMarket = new Market({
                        serverID: message.guild.id,
                        itemID: itemid,
                        itemName: newitem,
                        price: newprice,
                         });
newMarket.save().catch(err => console.error(err));
                  const embed = new RichEmbed()
                  .setTitle('**Transcation Details**')
                .addField('Author', message.guild.members.get(message.author.id))
                .addField('Item', newitem)
                .addField('Price', newprice)
                .setTimestamp(new Date())
                .setFooter('Coins Payment');                  
                

                return message.send(embed);
}};