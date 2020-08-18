const mongoose = require('mongoose');
module.exports = mongoose.model('Order', new mongoose.Schema({
    orderId: Number,
    storeId: Number,
    warehouseId : Number,
    productType: String,
    quantity: Number,
    deliveryDateTime: Number
}));
