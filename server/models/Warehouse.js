const mongoose = require('mongoose');
module.exports = mongoose.model('Warehouse', new mongoose.Schema({
    id: Number,
    password: String,
    location: Object,
    SOH: Object,
    TEMP: Object
}));
