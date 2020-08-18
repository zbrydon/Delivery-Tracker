const mongoose = require('mongoose');
module.exports = mongoose.model('Store', new mongoose.Schema({
    id: Number,
    password: String
}));
