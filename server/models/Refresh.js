const mongoose = require('mongoose');
module.exports = mongoose.model('refresh', new mongoose.Schema({
    refresh: String
}));
