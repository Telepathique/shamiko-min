const mongoose = require('mongoose');
const Money = require('../../mongodb/money.js');
const { RichEmbed } = require("discord.js");
const {green_light, red_light} = require("../../colours.json")
module.exports = {
  config: {
    name: "dice",
    description: "buy a specific item from the market",
    usage: "[item type]",
    aliases: ["shop"],
    category: "limited",
    accessableby: "Members",
    cooldowns: 0
  },
  async run(bot, message, args)  {
     if ((message.member.roles.find(r => r.name === "Mercenary"))||(message.member.roles.find(r => r.name === "General"))||(message.member.roles.find(r => r.name === "Minor-God"))||(message.member.roles.find(r => r.name === "Love-live-idol"))||(message.member.roles.find(r => r.name === "Ryuko-Yoshida"))||(message.member.roles.find(r => r.name === "Magical-Girl"))||(message.member.roles.find(r => r.name === "Honkers"))||(message.member.roles.find(r => r.name === "Momo-Chiyoda"))||(message.member.roles.find(r => r.name === "Shamiko"))) {

    if (args) {
        var amount = parseInt(args[0]);
      }
      
        if (isNaN(amount)) {
            return message.reply('please enter a valid number for the amount of coin you want to bet.');
        }

        if (amount > 100) {
            return message.reply('the maximum bet amount is 100 coins!')
        } else if (amount) {
          //Dice code:
          var roll1 = (Math.floor(Math.random() * 6) +1 );
          var roll2 = (Math.floor(Math.random() * 6)+1 );
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id,
        }, (err, money) => {
            if (err) {
                console.error(err);
                return message.reply('sorry, an error occurred!');
            }
            if (!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: 0,
                });

                newMoney.save().catch(err => console.error(err));

                return message.reply('you can\'t participate since you do not have any coins associated with your account');
            }
            else {
                if (amount > money.money) {
                    return message.reply('you do not have enough coins to gamble!');
                }

          if (roll1 == 1 && roll2 == 1) {
              amount = amount * 2;
               money.money = money.money + amount;
                money.save().catch(err => console.error(err));
const dice2time = new RichEmbed()
            .setTitle("🎲🎲Dices Game!🎲🎲")
            .setColor(green_light)
            .setDescription("Snake Eyes !! " + message.author.username )
            .addField("Congratulation! ","You rolled : "+roll1 + " & " +roll2)
            .addField("You Won 2 time your ",  amount + " coins")
            .addField("Your balance is now : ", money.money+ " coins")
            .setTimestamp()
            .setThumbnail("https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Fdices%5B1%5D.png?v=1586706985234")
            return message.channel.send(dice2time);
          }
          else if (roll1 == roll2) {
            amount = amount * 4;
              money.money = money.money + amount;
                money.save().catch(err => console.error(err));
const dice4time = new RichEmbed()
            .setTitle("🎲🎲Dices Game!🎲🎲")
            .setColor(green_light)
            .setDescription("Its a match !!! " + message.author.username )
            .addField("Congratulation !","You rolled : "+roll1 + " & " +roll2)
            .addField("You Won 4 time your ",  amount + " coins")
            .addField("Your balance is now : ", money.money+ " coins")
            .setTimestamp()
            .setThumbnail("https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Fdices%5B1%5D.png?v=1586706985234")
            return message.channel.send(dice4time);
                    }
          else {
             money.money = money.money - amount;
                money.save().catch(err => console.error(err));
            const diceloose = new RichEmbed()
            .setTitle("🎲🎲Dices Game!🎲🎲")
            .setColor(red_light)
            .setDescription("Unlucky " + message.author.username )
            .addField("Sorry ","You rolled : "+roll1 + " & " +roll2)
            .addField("you lost ",  amount + " coins")
            .addField(" your balance is : ", `${money.money} coins`)
            .setTimestamp()
            .setThumbnail("https://cdn.glitch.com/94da85c3-7345-4fdf-896d-87cf90d792ac%2Fdices%5B1%5D.png?v=1586706985234")
            return message.channel.send(diceloose);
          
                }
            }
        });
    }}
    else {
      message.reply(
        `sorry you must have at least the <@&697203042038186135> to use this command.`
      );
    }
  }
}