const Order = require('../models/Order');
const url = require('url');

function viewOrder(req , res, next) {
    const query = url.parse(req.url,true).query;
    const warehouseId = query.warehouseId;
    const storeId = query.storeId;
    
    Order.find({ warehouseId: warehouseId, storeId: storeId }, (err, orders) => {
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