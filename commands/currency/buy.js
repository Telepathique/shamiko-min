const fs = require("fs");
const utility = require("../../utility.js");
const mongoose = require("mongoose");
const { RichEmbed } = require("discord.js");
const Money = require("../../mongodb/money.js");
const Market = require("../../mongodb/market.js");

module.exports = {
  config: {
    name: "buy",
    description: "buy a specific item from the market",
    usage: "[item type]",
    aliases: ["shop"],
    category: "currency",
    accessableby: "Members",
    cooldowns: 0
  },
  async run(bot, message, args) {
    const name = args.join("");
    const item = name.toLowerCase();
    if (!name) return message.reply(`Oops you cannot buy \`**Air**\``);
    if (name == parseInt(args[0])) {
      return message.reply("sorry this is a `number` not a valid  name");
    } else {
      const cursor = Market.findOne({
        serverID: message.guild.id,
        itemName: item,
      });
      cursor.exec((err, result) => {
        if (err) {
          console.error(err);
          return message.reply("sorry an error has occurred!");
        }
        if (!result) {
          return message.reply("sorry we do not have such item in our market.");
        }
        const itemName = result.itemName;
        const itemID = result.itemID;
        const price = result.price;

        
        let amount = 1;

        let flag = true;
        if (
          item === itemName ||
          item === result.itemID
        ) {
          const filter = res => {
            return res.author.id === message.author.id;
          };
          message.reply("Please wait we confirm the purchase");
        }

        Money.findOne(
          {
            userID: message.author.id,
            serverID: message.guild.id
          },
          (err, money) => {
            if (err) {
              console.error(err);
              return message.reply("sorry, an error occurred!");
            }
            if (!money) {
              const newMoney = new Money({
                userID: message.author.id,
                serverID: message.guild.id,
                money: 0
              });

              newMoney.save().catch(err => console.error(err));

              return message.reply(
                "you can't make a payment since you do not have any coins associated with your account"
              );
            } else {
              if (money.money < price) {
                return message.reply(
                  "you do not have enough coins to complete the payment."
                );
              }

              money.money = money.money - price;
              money.save().catch(err => console.error(err));

              const roles = message.member.roles;

              const role = message.guild.roles.find(
                role => role.name.toLowerCase() === itemName.toLowerCase()
              );
              console.log(role.name.toLowerCase());
              console.log(itemName.toLowerCase());

              if (roles.has(role.id)) {
                return message.reply("you already purchased this role");
                if (role.id !== itemID);
                return message.reply(
                  `we couldn't find the ${role.name} maybe an error on the server roles.`
                );
              } else {
                message.member.addRole(role);
                  const buyEmbed = new RichEmbed()
                .setTitle('💸💸 **Transcation Details**')
                .addField('Buyer', message.guild.members.get(message.author.id))
                .addField('Payemnt Amount', result.price)
                .addField('Buyed item', role.name)
                .addField('Balance', money.money)
                .setTimestamp(new Date())
                .setFooter('Coins Payment');
          message.reply(buyEmbed);
        const banChannel = message.guild.channels.find('name', 'money-records');
        if (!banChannel) {
            return message.channel.send('Can\'t find money-records channel');
        }
        banChannel.send(buyEmbed);
                
              }
            }
          }
        );
      });
    }
  }
};
