const mongoose = require('mongoose');
module.exports = mongoose.model('Warehouse', new mongoose.Schema({
    id: Number,
    password: String,
    SOH: Object,
    TEMP: Object
}));
