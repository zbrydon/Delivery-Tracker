const Order = require('../models/Order');

function viewOrder(req, res, next) {
    const storeId = res.obj.id;
    console.log(storeId);
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
            console.log(orders[0]);
            res.locals.orders = orders;
            next();
        }
    });
};

module.exports = viewOrder;  