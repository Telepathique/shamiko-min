const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    serverID: String,
    itemID: String,
    itemName: String,
    price: Number,
});

module.exports = mongoose.model('Market', itemSchema);