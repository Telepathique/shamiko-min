module.exports = async bot => {
  const mongoose = require("mongoose");
  const Config = require("/app/mongodb/schema.js");
  
    const config = require("/app/botconfig.json");

  const URIString = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@shamiko-min-l6lra.mongodb.net/test?retryWrites=true&w=majority`;
const  Options = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(URIString, Options).then(() => {
        console.log("Connected to the Mongodb database.");
    }).catch((err) => {
        console.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });
  console.log(`${bot.user.username} is online`)
      await bot.guilds.keyArray().forEach(id => {

        
        Config.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newConfig = new Config({
                    guildID: id,
                    prefix: config.prefix
                });

                return newConfig.save();
            }
        });
   
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

    let statuses = [
        `${bot.guilds.size} servers!`,
        "!help",
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 55000)
  

}
                                          )}