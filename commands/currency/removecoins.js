const {RichEmbed} = require("discord.js");
const fs = require('fs');
const utility = require('../../utility.js');
const mongoose = require('mongoose');

const Money = require('../../mongodb/money.js');

module.exports = {
  config:{
    name: 'removecoins',
    description: 'Remove an amount of coins to a user',
    usage: '!remove userID Amount to remove',
    aliases: ["take", "tc",],
    category: "owner",
    type: "owner",
    accessableby: "Owner",
    cooldowns: 0,
  },
async run (bot,  message, args){
     if (
      message.author.id === process.env.ownerid ||
     message.author.id === process.env.subowner) {
                        message.channel.send('Please ID of who you want to takecoins.');
          const m = await message.channel.awaitMessages(m => m.content,{ max: 2,  time: 60000, errors: ['time']})
       const recipient= m.last();
      message.channel.send(`please give me the amount that you want to remove to <@${recipient}>`);
       const m1 = await message.channel.awaitMessages(m1 => m1.content, { max: 2,  time: 60000, errors: ['time']})
const amount = parseInt(m1.last());
            
        if (isNaN(amount)) {
            return message.reply('Please provide a valid amount to take!');
        }
     
  Money.findOne({
                        serverID: message.guild.id,
                        userID: recipient }, (err, money) => {
    if (err) {
                console.error(err);
            

                         return message.reply('sorry, an error occurred!');
            }
            if (!money) {
                const newMoney = new Money({
                    userID: recipient,
                    serverID: message.guild.id,
                    money: 0,
                });

                newMoney.save().catch(err => console.error(err));

                return message.reply('you can\'t participate since you do not have any coins associated with your account');
            
                
        
  } else {
                
 if  ( money.money < amount )  {
                      money.money = 0;
               money.save();
                   const embed = new RichEmbed()
          .setTitle(`/!\\ Remove coins /!\\ `)
          .setDescription(`<@${recipient}> total coins have been successfully reduced to \`**0**\` due to ${amount} > than coins of the user`)
          .addField("Author", message.author.username)
          message.channel.send(embed);


 }else{
     
                money.money = money.money - amount
               money.save();         
                const embed = new RichEmbed()
          .setTitle(`/!\\ Remove coins /!\\ `)
          .setDescription(`<@${recipient}> total coins have been successfully reduced of : ${amount} coins!, and now have a new balance of :  ${money.money}`)
          .addField("Author", message.author.username)
          
                message.channel.send(embed);
     const banChannel = message.guild.channels.find('name', 'money-records');
        if (!banChannel) {
            return message.channel.send('Can\'t find money-records channel');
        }
        banChannel.send(embed);
    }}


          
})}else {return message.channel.send(
        "You dont have permission to perform this command!"); 
        }
   }
};