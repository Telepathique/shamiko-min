const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const Market = require('../../mongodb/market.js');

module.exports = {
  config: {
    name: 'market',
    description: 'provides a list of all the items in market',
    category: "currency",
    aliases: ["shop", "cs", "mp"],
    accessableby: "Members",
    cooldowns: 0,
  },
    run(client, message, args) {
      
            Market.findOne({
                serverID: message.guild.id,
                
            }, (err, market) => {
                if (err) console.error(err);
                if (!market) {
                  const r = message.guild.roles.find(r => r.name === "Apostles");
                    const newMarket = new Market({
                        serverID: message.guild.id,
                        itemID: r.id,
                        itemName: "apostles",
                        price: 100,
                         });
newMarket.save()
                        .catch(err => console.error(err));
                   let marketrole2 = message.guild.roles.find(r => r.name === "Soldier");
     const newMarket1 = new Market({ serverID: message.guild.id,
                        itemID: marketrole2.id,
                        itemName: "soldier",
                        price: 200,
                        });
newMarket1.save()
                        .catch(err => console.error(err));
                  let marketrole3 = message.guild.roles.find(r => r.name === "Mercenary");
const newMarket2 = new Market({ serverID: message.guild.id,
                        itemID: marketrole3.id,
                        itemName: "mercenary",
                        price: 1000,
                                 });
newMarket2.save()
                        .catch(err => console.error(err));
                  let marketrole4 = message.guild.roles.find(r => r.name === "General");
                  const newMarket40 = new Market({     serverID: message.guild.id,
                        itemID: marketrole4.id,
                        itemName: "general",
                        price: 2500,
                                                     });
newMarket40.save()
                  let marketrole5 = message.guild.roles.find(r => r.name === "Minor-God");
                     const newMarket3 = new Market({    serverID: message.guild.id,
                        itemID: marketrole5.id,
                        itemName: "minor-god",
                        price: 5000,
                                                      });
newMarket3.save()
                        .catch(err => console.error(err));
                   let marketrole6 = message.guild.roles.find(r => r.name === "Love-live-idol");
                    const newMarket4 = new Market({     serverID: message.guild.id,
                        itemID: marketrole6.id,
                        itemName: "love-live-idol",
                        price: 7500,
                                                     });
newMarket4.save()
                        .catch(err => console.error(err));
                  let marketrole7 = message.guild.roles.find(r => r.name === "Ryuko-Yoshida");
                       const newMarket5 = new Market({  serverID: message.guild.id,
                        itemID: marketrole7.id,
                        itemName: "ryuko-yoshida",
                        price: 10000,
                                                        });
newMarket5.save()
          
                .catch(err => console.error(err));
                  let marketrole8 = message.guild.roles.find(r => r.name === "Magical-Girl");
                                   const newMarket9 = new Market({  serverID: message.guild.id,
                        itemID: marketrole8.id,
                        itemName: "magical-girl",
                        price: 15000,
                                                        });
newMarket9.save()
          let marketrole9 = message.guild.roles.find(r => r.name === "Honkers");
                  const newMarket6 = new Market({   serverID: message.guild.id,
                        itemID: marketrole9.id,
                        itemName: "honkers",
                        price: 25000,
                                                       });
newMarket6.save()
                        .catch(err => console.error(err));
                  let marketrole10 = message.guild.roles.find(r => r.name === "Momo-Chiyoda");
                     const newMarket7 = new Market({    serverID: message.guild.id,
                        itemID: marketrole10.id,
                        itemName: "momo-chiyoda",
                        price: 35000,  });
newMarket7.save()
                        .catch(err => console.error(err));
                      let marketrole11 = message.guild.roles.find(r => r.name === "Shamiko");
                      const newMarket8 = new Market({   serverID: message.guild.id,
                        itemID: marketrole11.id,
                        itemName: "shamiko",
                        price: 500000,
                    });
newMarket8.save()
                        .catch(err => console.error(err));
            }
        }
          );
const cursor = Market.find({ 'serverID': message.guild.id }).sort({ 'price': -1 });
    const embed = new Discord.RichEmbed()
            .setColor('#DAA520')
            .setTitle('Market items list')
            .setFooter('Market', message.guild.iconURL);

        cursor.exec((err, result) => {
            if (err) {
                console.error(err);
                return message.reply('sorry an error has occurred!');
            }

            let order = 0;
            for(let i = 0; i < 100; i++) {
                if(i > result.length - 1) {
                    break;
                
                }
                const user = message.author.id;
                const itemid = result[i].itemID;
                const itemName = result[i].itemName; 
                const price = result[i].price;



                if(!user.bot) {
                    embed.addField((`${itemName}  role id : ${itemid}`), `Price : ${price} coins`);
                    order++;
                }
            }

            message.channel.send(embed);
        });
    }}
