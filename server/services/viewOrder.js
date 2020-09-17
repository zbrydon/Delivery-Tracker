const Order = require('../models/Order');
const url = require("url");

function viewOrder(req, res, next) {
    const storeId = res.obj.id;
    const query = url.parse(req.url, true).query;
    const orderId = query.orderId;
    Order.findOne({ storeId: storeId , orderId:orderId}, (err, order) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!order) {
            return res.status(400).send({
                success: false,
                message: 'This store has no orders'
            });
        } else {
            res.locals.order = order;
            next();
        }
    });
};

module.exports = viewOrder;  