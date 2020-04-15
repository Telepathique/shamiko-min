const Discord = require('discord.js');
const mongoose = require('mongoose');
const Money = require('../../mongodb/money.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];



module.exports = {
 config: {
    name: 'coins-leader',
    aliases: ['money-leader',"cl","leader", "top"],
    description: 'displays the top 10 users that have the most coins',
   category: "currency",
    accessableby: "Members",
    cooldowns: 5,
 },
    run(bot, message, args) {
        const cursor = Money.find({ 'serverID': message.guild.id }).sort({ 'money': -1 });
        const embed = new Discord.RichEmbed()
            .setColor('#DAA520')
            .setTitle(':money_with_wings: Top 10 Coins Leaderboard')
            .setFooter('Coins System', message.guild.iconURL);

        cursor.exec((err, result) => {
            if (err) {
                console.error(err);
                return message.reply('sorry an error has occurred!');
            }

            let order = 0;
            for(let i = 0; i < 10; i++) {
                if(i > result.length - 1) {
                    break;
                }
                const user = message.guild.members.get(result[i].userID).user;

                if(!user.bot) {
                    embed.addField((`${numbers[order]} `+user.username+"\n"),('Total Coins: '+result[i].money));
                    order++;
                }
            }

            message.channel.send(embed);
        });
    },
};