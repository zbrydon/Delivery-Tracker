const Order = require('../models/Order');
const url = require('url');

function viewOrder(req , res, next) {
    const warehouseId = res.obj.id;
    Order.find({ warehouseId: warehouseId }, (err, orders) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } else {
            res.locals.orders = orders;
            next();
        }
    });
};

module.exports = viewOrder;  