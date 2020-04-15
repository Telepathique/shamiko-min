const Discord = require('discord.js');
const mongoose = require('mongoose');
const Money = require('../../mongodb/money.js');

module.exports = {
  config:{
    name: 'wallet',
    description: 'dsiplays coin infos about a particular user',
    cooldowns: 3,
    category: "currency",
    accessableby: "Members",
  aliases:["coins","bank", "balance","bal","coin", "money"],
},
    run(bot, message, args) {
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id,
        }, (err, money) => {
            if (err) console.error(err);
            const memberInfo = new Discord.RichEmbed()
                    .setTitle('💳 Coins Info 💳')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
                    .setDescription('Participant in channels under the Spam-Commands category, win coins to buy specials roles')
                    .setThumbnail(`${message.author.displayAvatarURL}`)
                    .setTimestamp(new Date())
                    .setFooter('💸 Coins System 💸');

            if (!money) {
                memberInfo.addField('Total Coins', 0);
            }
            else {
                memberInfo.addField('Total Coins', money.money);
            }

            return message.channel.send(memberInfo);
        });
    }
}