const mongoose = require('mongoose');
const Money = require('../../mongodb/money.js');

module.exports = {
  config:{
    name: 'gamble',
    description: 'gamble a certain amount of coins, the users might lost some or all of the capital, but they can also win extra',
    usage: '!gamble [coin amount]',
    category: "limited",
    type: "fun",
    accessableby: "Members",
    cooldowns: 0,
  },
   async run(bot, message, args) {
      if ((message.member.roles.find(r => r.name === "Mercenary"))||(message.member.roles.find(r => r.name === "General"))||(message.member.roles.find(r => r.name === "Minor-God"))||(message.member.roles.find(r => r.name === "Love-live-idol"))||(message.member.roles.find(r => r.name === "Ryuko-Yoshida"))||(message.member.roles.find(r => r.name === "Magical-Girl"))||(message.member.roles.find(r => r.name === "Honkers"))||(message.member.roles.find(r => r.name === "Momo-Chiyoda"))||(message.member.roles.find(r => r.name === "Shamiko"))) {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('please enter a valid number for the amount of coin you want to gamble.');
        }

        if (amount > 100) {
            return message.reply('the maximum gamble amount is 100 coins!')
        }

        const result = ((Math.floor(Math.random() * 2.5 + 0) * Math.floor(amount)));

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

                money.money = money.money - amount + result;
                money.save().catch(err => console.error(err));

                if (result === amount) {
                    return message.reply(' have your captial back with no profit.'+ amount+ " your balance is : "+ money.money+ " coins");
                }
                else if (result > amount) {
                    return message.reply(` have gained a profit of ${result - amount} coins, congrats!`+ " your balance is : "+ money.money+ " coins");
                }
                else {
                    return message.reply(` RIP, you have lost ${amount - result}`+ " your balance is : "+ money.money+ " coins");
                }
            }
        });
      } else {
      message.reply(
        `sorry you must have at least the <@&697203042038186135> to use this command.`
      );
    }
      },
};