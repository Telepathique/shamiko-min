const mongoose = require('mongoose');

const cooldown = new mongoose.Schema({

    serverID: String,
    userID: String,
    userName: String,
    cooldown: Number,
    


});

module.exports = mongoose.model('user', cooldown);
