const mongoose = require('mongoose');
module.exports = mongoose.model('Delivery', new mongoose.Schema({
    deliveryId: Number,
    storeId: Number,
    warehouseId : Number,
    productType: String,
    quantity: Number,
    deliveryDateTime: Number,
    deliveryStatus: String
}));
