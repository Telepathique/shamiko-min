const mongoose = require("mongoose"),
config = require("../../mongodb/schema.js")
const Discord = require("discord.js");
module.exports = {
    config: {
    name: "setprefix",
    description: "",
    usage: "",
    category: "moderation",
    accessibleby: "Moderators",
    aliases: ["sp", "prefix"],
      cooldowns: 0,
  },
  
  run: async (bot, message, args) => {


 const newprefix = args[0];
        if(!newprefix){
            return message.channel.send("please enter a valid prefix");
        }
        if(newprefix.length > 5){
            return message.channel.send("too many characters (limit 5)");
        }
        
          config.updateOne(
            {guildID: message.guild.id}, 
        { prefix: newprefix}
    , (err, guild) => {
        if (err) console.error(err);

        
        // Sucess
        return message.channel.send(`Successfully set the new prefix as ${newprefix}`);
  });
}};