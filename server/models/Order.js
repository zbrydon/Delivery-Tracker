const mongoose = require('mongoose');
module.exports = mongoose.model('Order', new mongoose.Schema({
    orderId: Number,
    storeId: Number,
    warehouseId : Number,
    productType: String,
    quantity: Number,
    deliveryDateTime: Number,
    orderDateTime: Number,
    temperature: Array,
    orderStatus: String
    //temp data type is array for now might change to json object depending on difficulty of future queries 
    
}));
