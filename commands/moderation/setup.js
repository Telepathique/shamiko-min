const { RichEmbed } = require("discord.js");
const { red_light } = require("../../colours.json");

module.exports = {
  config: {
    name: "setup",
    description: "create all roles needed to the bot",
    usage: "!setup",
    category: "moderation",
    accessibleby: "moderator",
    Disabled: false,
    cooldowns: 0,
  },
  run: async (bot, message, args) => {
   // check if the command caller has permission to use the command
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
      return message.channel.send(
        "You dont have permission to use this command."
      );

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel.send("I don't have permission to add roles!");
    let muterole = message.guild.roles.find(r => r.name === "Muted");
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#514f48",
          permissions: []
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

     let marketrole1 = message.guild.roles.find(r => r.name === "Apostles");
    if (!marketrole1) {
      try {
        marketrole1 = await message.guild.createRole({
          name: "Apostles",
          color: "#db71c2",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
           let marketrole2 = message.guild.roles.find(r => r.name === "Soldier");
    if (!marketrole2) {
      try {
        marketrole2 = await message.guild.createRole({
          name: "Soldier",
          color: "#c69fee",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      let marketrole3 = message.guild.roles.find(r => r.name === "Mercenary");
    if (!marketrole3) {
      try {
        marketrole3 = await message.guild.createRole({
          name: "Mercenary",
          color: "#70b692",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      let marketrole4 = message.guild.roles.find(r => r.name === "General");
    if (!marketrole4) {
      try {
        marketrole4 = await message.guild.createRole({
          name: "General",
          color: "#995c5c",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
            let marketrole5 = message.guild.roles.find(r => r.name === "Minor-God");
    if (!marketrole5) {
      try {
        marketrole5 = await message.guild.createRole({
          name: "Minor-God",
          color: "#979560",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
       let marketrole6 = message.guild.roles.find(r => r.name === "Love-live-idol");
    if (!marketrole6) {
      try {
        marketrole6 = await message.guild.createRole({
          name: "Love-live-idol",
          color: "#e4b400",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      let marketrole7 = message.guild.roles.find(r => r.name === "Ryuko-Yoshida");
    if (!marketrole7) {
      try {
        marketrole7 = await message.guild.createRole({
          name: "Ryuko-Yoshida",
          color: "#4c6876",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      let marketrole8 = message.guild.roles.find(r => r.name === "Magical-Girl");
    if (!marketrole8) {
      try {
        marketrole8 = await message.guild.createRole({
          name: "Magical-Girl",
          color: "#843da4",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      let marketrole9 = message.guild.roles.find(r => r.name === "Honkers");
    if (!marketrole9) {
      try {
        marketrole9 = await message.guild.createRole({
          name: "Honkers",
          color: "#d6680e",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      let marketrole10 = message.guild.roles.find(r => r.name === "Momo-Chiyoda");
    if (!marketrole10) {
      try {
        marketrole10 = await message.guild.createRole({
          name: "Momo-Chiyoda",
          color: "#277ecd",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      let marketrole10 = message.guild.roles.find(r => r.name === "Shamiko");
    if (!marketrole10) {
      try {
        marketrole10 = await message.guild.createRole({
          name: "Shamiko",
          color: "#da004e",
          permissions: []
        });
         } catch (e) {
        console.log(e.stack);
      }
      
    let logs = await message.guild.createChannel("logs", {
      type: "text",
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["MANAGE_MESSAGES"],
          allow: ["SEND_MESSAGES"]
        }
      ]
    });

    let reports = await message.guild.createChannel("reports", {
      type: "text",
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["MANAGE_MESSAGES"],
          deny: ["SEND_MESSAGES"]
        }
      ]
    });
      let moneyreports= await message.guild.createChannel("money-records", {
      type: "text",
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["MANAGE_MESSAGES"],
          deny: ["SEND_MESSAGES"]
        }
      ]
    });
    let embed = new RichEmbed()
      .setColor(red_light)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "setup")
      .addField("Moderator:", message.author.username)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find(c => c.name === "logs");
    sChannel.send(embed);
  }
};
    }
    }
    }
    }}}}}}}}
