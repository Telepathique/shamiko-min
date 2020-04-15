const Money = require("../../mongodb/money.js");
const mongoose = require("mongoose");

const { RichEmbed } = require("discord.js");


module.exports = {
  config: {
    name: "blackjack",
    aliases: ["21", "bj", "blackj", "card"],
    category: "limited",
    usage: "!blackjack'amount 0-100 coins'",
    description:`Automated \🃏 Blackjack \🃏.\n If you win with a  **Blackjack ** you win \`4x\` your bet, \nelse \`2x\` your bet.  \nIf the house have a  **Blackjack** you loose \`4x \` your bet, else \`2x\` your bet. in a tie you wont loose nothing.`,
  },
  run: async (bot,message, args) => {
     if ((message.member.roles.find(r => r.name === "Mercenary"))||(message.member.roles.find(r => r.name === "General"))||(message.member.roles.find(r => r.name === "Minor-God"))||(message.member.roles.find(r => r.name === "Love-live-idol"))||(message.member.roles.find(r => r.name === "Ryuko-Yoshida"))||(message.member.roles.find(r => r.name === "Magical-Girl"))||(message.member.roles.find(r => r.name === "Honkers"))||(message.member.roles.find(r => r.name === "Momo-Chiyoda"))||(message.member.roles.find(r => r.name === "Shamiko"))) {
    const cardList = [2,2, 3,3, 4, 5, 6, 7, 8, 9, 10,10,10,10,11,11,1,1];
    const botCardList = [1,10,10,11,10, 10, 9, 8, 7, 6, 5, 4, 3, 2,2, 1];
    const card1 = cardList[Math.floor(Math.random() * cardList.length)];
    const card2 = cardList[Math.floor(Math.random() * cardList.length)];
    //const botCard1 = A ;//botCardList[Math.floor(Math.random() * botCardList.length)];
    const botCard1 =
      botCardList[Math.floor(Math.random() * botCardList.length)];
    const botCard2 =
      botCardList[Math.floor(Math.random() * botCardList.length)];
    const botCard3 =
      botCardList[Math.floor(Math.random() * botCardList.length)];
    const card3 = cardList[Math.floor(Math.random() * cardList.length)];
    
    const cardTotal = card1 + card2;
    const botTotal = botCard1 + botCard2;
    const cardTotalHit = cardTotal + card3;
    const botTotalHit = botTotal + botCard3;
    const botArr = [botTotal, botTotalHit, botTotal, botTotal];
    var suites = [":spades:", ":hearts:", ":diamonds:", ":clubs:"];
    const sort =    suites[Math.floor(Math.random() * suites.length)];
   const sort1 = suites[Math.floor(Math.random() * suites.length)];
     const sort2 =  suites[Math.floor(Math.random() * suites.length)];
      const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return message.reply(
        "please enter a valid number for the amount of coin you want to gamble."
      );
    }
    // if bet is over than X return error
    if (amount > 100) {
      return message.reply("the maximum gamble amount is 100 coins!");
    }
    // gain multipl
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
          const bet = amount*4;
          if (bet > money.money) {
            return message.reply("you do not have enough coins to flip the coin !");
          }

          const coinflipembed = new RichEmbed()
             .setTitle("🃏 Blackjack 🃏")
      .setColor("RANDOM")
      .setDescription(
        "**You drew " +
        card1 + sort1+
        " and " +
        card2 + sort2+
        " with a total of " +
        cardTotal + sort +
        "\n** and dealer first card is  " +
        botCard1)
         function doRand() {
            var rand = [cardTotalHit, cardTotal,cardTotalHit,];

            return rand[Math.floor(Math.random() * rand.length)];
          }
           const botresult = botArr[Math.floor(Math.random() * botArr.length)];
           const yourtotal = doRand();
          message.delete();
          message.channel.send(coinflipembed);
         console.log(botresult, yourtotal)
           if (yourtotal <= 20 && yourtotal > botresult && yourtotal !== 21 ) {
            const amount1 = amount * 2.5;
            money.money = money.money + amount1;
            money.save().catch(err => console.error(err));

            const coinflipembed = new RichEmbed()
              .setTitle("🃏 Blackjack 🃏")
              .setColor("RANDOM")
              .setTimestamp();
            coinflipembed.setDescription("Congratulation You won your bet and beaten house result : "+ botresult+ ' vs your results: ' + yourtotal),
              coinflipembed.addField(
                message.author.username,
                ` have gained a profit of ${amount1} coins!`
              );
              
            return message.channel.send(coinflipembed);
          } else if (yourtotal == 21 && botresult !== 21 ) {
            const amounts = amount * 4;
            money.money = money.money + amounts
            money.save().catch(err => console.error(err));

            const coinflipembed = new RichEmbed()
              .setTitle("🃏 Blackjack 🃏")
              .setColor("RANDOM")
              .setTimestamp();
            coinflipembed.setDescription("🃏 Blackjack 🃏 You won ! : "+ botresult+ ' vs your results: ' + yourtotal),
              coinflipembed.addField(
                message.author.username,
                ` have gained a profit of ${amounts} coins!`
              );
              
            return message.channel.send(coinflipembed);
          } else if (yourtotal == botresult && yourtotal <= 21){
            money.money = money.money;
            money.save().catch(err => console.error(err));

            const bjembed = new RichEmbed()
              .setTitle("🃏 Blackjack 🃏")
              .setColor("RANDOM")
              .setTimestamp();

            bjembed.setDescription("sorry, its a tie : "+ botresult+ ' vs your results: ' + yourtotal),
              bjembed.addField(`RIP`, `you got your coins back `);
               
            return message.channel.send(bjembed);
          
          } else if (yourtotal <= 20 && yourtotal < botresult && yourtotal !== 21 && botresult <=20){
            const results = amount * 2.5;
            money.money = money.money - results;
            money.save().catch(err => console.error(err));

            const bjembed = new RichEmbed()
              .setTitle("🃏 Blackjack 🃏")
              .setColor("RANDOM")
              .setTimestamp();

            bjembed.setDescription("sorry, you loose the house beat you with : "+ botresult+ ' vs your results: ' + yourtotal),
              bjembed.addField(`RIP`, `you have lost ${results} coins`);
               
            return message.channel.send(bjembed);
          }else if (yourtotal >=22){
            const results = amount * 2.5;
            money.money = money.money - results;
            money.save().catch(err => console.error(err));

            const bjembed = new RichEmbed()
              .setTitle("🃏 Blackjack 🃏")
              .setColor("RANDOM")
              .setTimestamp();

            bjembed.setDescription("sorry, you busted and loose"),
              bjembed.addField(`RIP`, `you have lost ${results} coins`);
               
            return message.channel.send(bjembed);
          }else if (botresult >=22){
            const results = amount * 2.5;
            money.money = money.money + results;
            money.save().catch(err => console.error(err));

            const bjembed = new RichEmbed()
              .setTitle("🃏 Blackjack 🃏")
              .setColor("RANDOM")
              .setTimestamp();

            bjembed.setDescription("Congrats!, House busted and loose"),
              bjembed.addField(`Congrats!`, `you have won ${results} coins`);
               
            return message.channel.send(bjembed);
          }else if (botresult ==21){
            const amount2 = amount * 4;
            money.money = money.money - amount2;
            money.save().catch(err => console.error(err));

            const bjembed = new RichEmbed()
              .setTitle("🃏 Blackjack 🃏")
              .setColor("RANDOM")
              .setTimestamp();

            bjembed.setDescription("sorry, You lost house 🃏 Blackjack 🃏 : "+ botresult+ ' vs your results: ' + yourtotal),
              bjembed.addField(`RIP`, `you have lost ${amount2} coins`);
               
            return message.channel.send(bjembed);
          }}
        }
      );
     }  else {
      message.reply(
        `sorry you must have at least the <@&697203042038186135> to use this command.`
      );
    }
     }}
