const mongoose = require('mongoose');
const Delivery = require('../models/Delivery');
const Order = require('../models/Order');

function deleteOrder(req, res, next) {
    const deletee = res.orderId;
    const query = { "orderId": deletee };

    Order.deleteOne(query)
        .then(result => console.log(`Deleted ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
    next();
};

module.exports = deleteOrder;  