
// website handler
const express = require("express");
const app = express();
app.use(express.static("web"));
app.get("/index.html", function(request, response){
response.sendFile(__dirname+'/web/index.html')
})
app.get("/contact.html", function(request, response){
response.sendFile(__dirname+'/web/contact.html')
})
app.get("/new.html", function(request, response){
response.sendFile(__dirname+'/web/new.html')
})
app.get("/image.html", function(request, response){
response.sendFile(__dirname+'/web/image.html')
})
//keep alive
app.use(express.static("public"));
app.get("/", (request, response) => {
  console.log(new Date() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const Money = require('./mongodb/money.js');
const User = require('./mongodb/user.js');
const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();
const http = require("http");
const { RichEmbed } = require("discord.js")
const { red_light } = require("./colours.json");

["aliases", "commands","cooldown"].forEach(x => (bot[x] = new Collection()));
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
bot.on("messageDeleteBulk",  function (messages) {
  const log = messages.first().guild.channels.find(x => x.name=== "logs")
  const message = messages
    .filter(m => m.content.length)
    .map(
      m =>
        "\nAuthor : " +
        m.author.username +
        "\n Message : " +
        m.content +
        "\n" +
        "\nChannel : <#" +
        m.channel.id +
        ">"
    )
    .forEach(message => log.send( 
             ` Clear command deleted : ${message}`))
    ;
});


bot.on('message', message => {
  

 //if ((message.channel.parent.name === "Spam-Command")&& message.content.startsWith(";"&& "!") && message.guild.id === "682869291997331466"){
  const coinsToAdd = 0.5;
            Money.findOne({
                userID: message.author.id,
                serverID: message.guild.id,
                userName: message.author.username,
            }, (err, money) => {
                if (err) console.error(err);
                if (!money) {
                    const newMoney = new Money({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        userName: message.author.username,
                        money: coinsToAdd,
                    });

                    newMoney.save()
                        .catch(err => console.error(err));
                }
                else {
                    money.money = money.money + coinsToAdd;
                    money.save()
                        .catch(err => console.error(err));
                }
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
            });}});


            });
        }//}
          );


bot.login(process.env.TOKEN);