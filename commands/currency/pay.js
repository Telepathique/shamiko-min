const Discord = require('discord.js');
const mongoose = require('mongoose');
const Money = require('../../mongodb/money.js');

module.exports = {
 config: {
    name: 'pay',
    description: 'user uses coins to pay another user for various reason',
    usage: '[recipient] [payment amount] [reason]',
   category: "currency",
    accessableby: "Members",
   cooldowns: 10,
},
   async run(bot, message, args) {
      
       message.channel.send('Please mention the user who you want to pay.');
          const m = await message.channel.awaitMessages(m =>message.mentions.users.first() || message.guild.members.get(args[0]),{ max: 1,  time: 60000, errors: ['time']})
       const recipient= m.last();
        
      message.channel.send("please give me the amount that you want to pay to this user")
       const m1 = await message.channel.awaitMessages(m1 =>m.author.id == message.author.id,  m1.content, { max: 1,  time: 60000, errors: ['time']})
       console.log(` ${m1.content}`);
const amount = parseInt(m1.last());
            
        if (isNaN(amount)) {
            return message.reply('Please provide a valid amount to pay!');
        }
  message.channel.send("Why did you pay her / him ?")
       const m2 = await message.channel.awaitMessages(m2 => m.author.id == message.author.id, m2.content, { max: 1,  time: 60000, errors: ['time']})
       console.log(` ${m2.content}`);
const reason = m2.last();

     Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id,
            userName:  message.author.username
        }, (err, money) => {
            if (err) {
                console.error(err);
                return message.reply('sorry, an error occurred!');
            }
            if (!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    userName: message.author.username,
                    money: 0,
                });

                newMoney.save().catch(err => console.error(err));

                return message.reply('you can\'t make a payment since you do not have any coins associated with your account');
            }
            else {
                if (money.momey < amount) {
                    return message.reply('you do not have enough coins to complete the payment.');
                }

                money.money = money.money - amount;
                money.save().catch(err => console.error(err));
            }
        });

        Money.findOne({
            userID: recipient.id,
            serverID: message.guild.id,
        }, (err, money) => {
            if (err) {
                console.error(err);
                return message.reply('sorry, an error occurred!');
            }
            if (!money) {
                const newMoney = new Money({
                    userID: recipient.id,
                    serverID: message.guild.id,
                    money: amount,
                });

                newMoney.save().catch(err => console.error(err));
            }
            else {
                money.money = money.money + amount;
                money.save().catch(err => console.error(err));
            }
        });

        const payEmbed = new Discord.RichEmbed()
                .setTitle('💸💸 **Transcation Details**')
                .addField('Recipient', recipient)
                .addField('Payer', message.guild.members.get(message.author.id))
                .addField('Payemnt Amount', amount)
                .addField('Payment Reason', reason)
                .setTimestamp(new Date())
                .setFooter('Coins Payment');
          message.reply(payEmbed);
        const banChannel = message.guild.channels.find('name', 'incidents');
        if (!banChannel) {
            return message.channel.send('Can\'t find incidents channel');
        }
        banChannel.send(payEmbed);
    },
};