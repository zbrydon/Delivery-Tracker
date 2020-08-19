const Order = require('../models/Order');

function viewOrder(req, res, next) {
    const warehouseId = res.warehouseId;
    Order.find({ order: warehouseId }, (err, orders) => {
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