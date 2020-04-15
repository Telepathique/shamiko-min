const Discord = require("discord.js");
const fs = require("fs");
const utility = require("../../utility.js");
const mongoose = require("mongoose");
const Money = require("../../mongodb/money.js");

module.exports = {
  config: {
    name: "resetcoins",
    description: "Remove an amount of coins to a user",
    usage: "!remove userID Amount to remove",
    aliases: ["rc", "reset"],
    category: "owner",
    type: "owner",
    accessableby: "Owner",
    cooldowns: 0
  },
  async run(bot, message, args) {
    if (
      message.author.id === process.env.ownerid ||
      message.author.id === process.env.subowner
    ) {
      
      message.channel.send("Please ID of who you want to reset coins.");
      const m = await message.channel.awaitMessages(m => m.content, {
        max: 2,
        time: 60000,
        errors: ["time"]
      });
      const recipient = m.last();

      Money.findOne(
        {
          serverID: message.guild.id,
          userID: recipient
        },
        (err, money) => {
          if (err) {
            console.error(err);

            return message.reply("sorry, an error occurred!");
          }
          if (!money) {
            const newMoney = new Money({
              userID: recipient,
              serverID: message.guild.id,
              money: 0
            });

            newMoney.save().catch(err => console.error(err));

            return message.reply(
              "you can't reset this user coins they already are at `**0**`"
            );
          } else {
            money.money = 0;
            money.save();

            const embed = new Discord.RichEmbed()
              .setTitle(`/!\\ Reset coins /!\\ `)
              .setDescription(
                `<@${recipient}> total coins have been successfully reset, and now have a new balance of :  ${money.money}`
              );
            message.channel.send(embed);
            const banChannel = message.guild.channels.find('name', 'money-records');
                if (!banChannel) {
            return message.channel.send('Can\'t find money-records channel');
        }
        banChannel.send(embed);
    }
          }
        
      );
    }else {return message.channel.send(
        "You dont have permission to perform this command!"
      );
    }
  }
};
