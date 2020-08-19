const Order = require('../models/Order');

function viewOrder(req, res, next) {
    const storeId = res.storeId;
    Order.find({ order: storeId }, (err, orders) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } else {
            return res.send(orders);
            next();
        }
    });
};

module.exports = viewOrder;  