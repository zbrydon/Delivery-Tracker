const mongoose = require('mongoose');
module.exports = mongoose.model('Order', new mongoose.Schema({
    orderId: Number,
    storeId: Number,
    warehouseId : Number,
    frozenQuantity: Number,
    dairyQuantity: Number,
    meatQuantity: Number,
    produceQuantity: Number,
    ambientQuantity: Number,
    deliveryDateTime: Number,
    orderDateTime: Number,
    temperature: Array,
    orderStatus: String,
    location: Object,
    ETA: String,
    EDA: Number
    //temp data type is array for now might change to json object depending on difficulty of future queries 
    
}));
