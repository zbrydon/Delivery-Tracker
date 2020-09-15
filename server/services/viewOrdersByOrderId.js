const Order = require('../models/Order');
const url = require("url");

function viewOrdersByOrderId(req, res, next) {
    const query = url.parse(req.url, true).query;
    const orderId = query.orderId;
    Order.find({ orderId: orderId }, (err, orders) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!orders) {
            return res.status(400).send({
                success: false,
                message: 'Has no orders'
            });
        } else {
            res.locals.orders = orders;
            next();
        }
    });
};

module.exports = viewOrdersByOrderId;  