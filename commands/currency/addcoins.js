const { RichEmbed } = require("discord.js");
const fs = require("fs");
const utility = require("../../utility.js");
const mongoose = require("mongoose");

const Money = require("../../mongodb/money.js");

module.exports = {
  config: {
    name: "addcoins",
    description: "Set a new item on the market",
    usage: "!additem name price",
    aliases: ["give", "gc"],
    category: "owner",
    type: "owner",
    accessableby: "Owner",
    cooldowns: 0
  },
  async run(bot, message, args) {
    if (
      message.author.id === process.env.ownerid ||
      message.author.id === process.env.subowner
    ) {message.channel.send("Please ID of who you want to pay.");
      const m = await message.channel.awaitMessages(m => m.content, {
        max: 2,
        time: 60000,
        errors: ["time"]
      });
      const recipient = m.last();
      message.channel.send(
        "please give me the amount that you want to give to this user"
      );
      const m1 = await message.channel.awaitMessages(m1 => m1.content, {
        max: 2,
        time: 60000,
        errors: ["time"]
      });
      const amount = parseInt(m1.last());

      if (isNaN(amount)) {
        return message.reply("Please provide a valid amount to give!");
      }

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
            const embed1 = new RichEmbed()
            .setTitle(
              "💸💸 **Transcation Details**"
            )
              .addField("Recipient", recipient)
              .addField("Payer", message.guild.members.get(message.author.id))
              .addField("Payment Amount", amount)
              .addField("New balance", money.money)
              .setTimestamp(new Date())
              .setFooter("Coins Payment");

            return message.reply(embed1);
          } else {
            money.money = money.money + amount;
            money.save();
            const embed = new RichEmbed()
              .setTitle("💸💸 **Transcation Details**")
              .addField("Recipient", `<@${recipient}>`)
              .addField("Payer", message.guild.members.get(message.author.id))
              .addField("Payment Amount", amount)
              .addField("New balance", money.money)
              .setTimestamp(new Date())
              .setFooter("Coins Payment");
            return message.channel.send(embed);
          
           const banChannel = message.guild.channels.find('name', 'money-records');
        if (!banChannel) {
            return message.channel.send('Can\'t find incidents channel');
        }
        banChannel.send(embed);
    }
        }
        
      );
    
    } else {
      return message.reply(
        "You dont have permission to perform this command!"
      );
    } 
  }
};
