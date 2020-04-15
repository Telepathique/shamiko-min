const mongoose = require("mongoose");
const Money = require("../../mongodb/money.js");
const { RichEmbed } = require("discord.js");
const {green_light, red_light} = require("../../colours.json")

module.exports = {
  config: {
    name: "coinflip",
    aliases: ["cf"],
    description: "Try your luck between head or tail ",
    usage: "!cf amount heads or tails",
    category: "fun",
    type: "fun",
    accessableby: "Members",
    cooldowns: 0
  },
  async run(bot, message, args) {
    // if arg[1] != tails or heads return error 
 if ((message.member.roles.find(r => r.name === "Mercenary"))||(message.member.roles.find(r => r.name === "General"))||(message.member.roles.find(r => r.name === "Minor-God"))||(message.member.roles.find(r => r.name === "Love-live-idol"))||(message.member.roles.find(r => r.name === "Ryuko-Yoshida"))||(message.member.roles.find(r => r.name === "Magical-Girl"))||(message.member.roles.find(r => r.name === "Honkers"))||(message.member.roles.find(r => r.name === "Momo-Chiyoda"))||(message.member.roles.find(r => r.name === "Shamiko"))) {
    var side = args[1];
    if (!["heads", "tails"].includes(side)) {
      console.log(args[1]);
      return message.reply(`please use [prefix]coinflip amount heads/tails`);
    }
    // if arg[0] !coinflip X != number return error
    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return message.reply(
        "please enter a valid number for the amount of coin you want to gamble."
      );
    }
    // if bet is over than X return error
    if (amount > 100) {
      return message.reply("the maximum gamble amount is 100coins!");
    }
    // gain multiply
    const result = amount * 2.5;
    // look on the db for the user money
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
            "you can't participate since you do not have any coins associated with your account"
          );
        } else {
          if (amount > money.money) {
            return message.reply("you do not have enough coins to flip the coin !");
          }

          const coinflipembed = new RichEmbed()
            .setTitle("Coinflip")
            .setColor("RANDOM")
            .setTimestamp();

          function doRandHT() {
            var rand = ["heads", "tails"];

            return rand[Math.floor(Math.random() * rand.length)];
          }
          const flip = doRandHT();

          function image() {
            if (flip === "heads")
              return coinflipembed.setThumbnail(
                "https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Fhead.png?v=1585917693312"
              );
            else {
              return coinflipembed.setThumbnail(
                "https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Ftails.png?v=1585917697517"
              );
            }
          }
          image();

          if (side == flip) {
            money.money = money.money - amount + result;
            money.save().catch(err => console.error(err));

            const coinflipembed = new RichEmbed()
              .setTitle("Coinflip")
              .setColor("RANDOM")
              .setTimestamp();
            coinflipembed.setDescription("Congratulation You won your bet and"),
              coinflipembed.addField(
                message.author.username,
                ` have gained a profit of ${result + amount} coins!`
              );
            function image() {
              if (flip === "heads")
                return coinflipembed.setThumbnail(
                  "https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Fhead.png?v=1585917693312"
                );
              else {
                return coinflipembed.setThumbnail(
                  "https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Ftails.png?v=1585917697517"
                );
              }
            }
            image();
            return message.channel.send(coinflipembed);
          } else {
            money.money = money.money - amount;
            money.save().catch(err => console.error(err));

            const coinflipembed = new RichEmbed()
              .setTitle("Coinflip")
              .setColor("RANDOM")
              .setTimestamp();

            coinflipembed.setDescription("sorry, You loose"),
              coinflipembed.addField(`RIP`, `you have lost ${amount} coins`);
            function image() {
              if (flip === "heads")
                return coinflipembed.setThumbnail(
                  "https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Fhead.png?v=1585917693312"
                );
              else {
                return coinflipembed.setThumbnail(
                  "https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Ftails.png?v=1585917697517"
                );
              }
            }
            image();
            return message.channel.send(coinflipembed);
          }
        }
      }
    );}else {
      message.reply(
        `sorry you must have at least the <@&697203042038186135> to use this command.`
      );
    }
  }
};