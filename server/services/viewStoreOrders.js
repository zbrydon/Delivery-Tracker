const Order = require('../models/Order');
const url = require("url");

function viewOrder(req, res, next) {
    const query = url.parse(req.url, true).query;
    const storeId = query.storeId;
    Order.find({ storeId: storeId }, (err, orders) => {
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
        } else {
            res.locals.orders = orders;
            next();
        }
    });
};

module.exports = viewOrder;  