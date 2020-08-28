const Order = require('../models/Order');

function viewOrder(req, res, next) {
    const storeId = res.storeId;
    Order.find({ order: storeId }, (err, orders) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!orders) {
            return res.status(400).send({
                success: false,
                message: 'This store has no orders'
            });
        }else {
            res.locals.orders = orders;
            next();
        }
    });
};

module.exports = viewOrder;  