const Order = require('../models/Order');

function viewOrder(req, res, next) {
    const { warehouseId } = req.query;
    console.log('warehouseId');
    console.log(warehouseId);
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