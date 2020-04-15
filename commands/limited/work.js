const Discord = require("discord.js");
const mongoose = require("mongoose");
const Money = require("../../mongodb/money.js");
const User = require("../../mongodb/user.js");
const convertMs = require("../../functions.js");
let toWait = Date.now() + 216000000;
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
module.exports = {
  config: {
    name: "work",
    description: "Make your brain work to gain money",
    usage: "Daily work",
    aliases: ["taff", "daily"],
    category: "limited",
    accessableby: "Members",
    cooldown: 6
  },

  async run(bot, message, args) {
    if ((message.member.roles.find(r => r.name === "Mercenary"))||(message.member.roles.find(r => r.name === "General"))||(message.member.roles.find(r => r.name === "Minor-God"))||(message.member.roles.find(r => r.name === "Love-live-idol"))||(message.member.roles.find(r => r.name === "Ryuko-Yoshida"))||(message.member.roles.find(r => r.name === "Magical-Girl"))||(message.member.roles.find(r => r.name === "Honkers"))||(message.member.roles.find(r => r.name === "Momo-Chiyoda"))||(message.member.roles.find(r => r.name === "Shamiko"))) {
      function generateXp(min, max) {
        return Math.ceil(Math.random() * (max - min + 1));
      }
      const coinsToAdd = generateXp(1, 30);

      User.findOne(
        {
          userID: message.author.id,
          serverID: message.guild.id,
          userName: message.author.username
        },
        (err, user) => {
          if (err) console.error(err);
          if (!user) {
            const newUser = new User({
              userID: message.author.id,
              serverID: message.guild.id,
              userName: message.author.username,
              cooldown: Date.now(),
            });

            newUser.save().catch(err => console.error(err));
          } else {
            let isInCooldown = user.cooldown;
            if (isInCooldown > Date.now()) {
              let time = isInCooldown - Date.now();
              const workembed1 = new Discord.RichEmbed()
                    .setTitle("💸💸Work day ended !💸💸")
                    .setDescription(`sorry you need to wait : ** ` +
                  msToTime(time) +
                  ` ** before using this command again!`
              );
              message.channel.send(workembed1)
            }else{
              Money.findOne(
                {
                  userID: message.author.id,
                  serverID: message.guild.id,
                  userName: message.author.username
                },
                (err, money) => {
                  if (err) console.error(err);
                  if (!money) {
                    const newMoney = new Money({
                      userID: message.author.id,
                      serverID: message.guild.id,
                      userName: message.author.username,
                      money: coinsToAdd
                    });

                    newMoney.save().catch(err => console.error(err));
                  } else {
                    user.cooldown = toWait;
                    user.save();
                    money.money = money.money + coinsToAdd;
                    money.save().catch(err => console.error(err));
                    const workembed = new Discord.RichEmbed()
                    .setTitle("💸💸Work day ended !💸💸")
                    .setDescription(`Congratulation ${message.author.username}, you just gained ${coinsToAdd} coins today`)
                    message.channel.send(workembed);
                  }
                }
              );
            }
          }
        }
      );
    } else {
      message.reply(
        `sorry you must have at least the <@&697203042038186135> to use this command.`
      );
    }
  }
};
