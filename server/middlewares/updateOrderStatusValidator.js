const validator = require('validator');

function validate(req, res, next) {
    const { orderId, orderStatus } = req.body
    if (!validator.isInt(orderId.toString(), { min: 1000 })) {
        return res.status(400).send({
            success: false,
            message: 'Order ID in incorrect format'
        });
    }
    if (!validator.equals(orderStatus, 'Unfulfilled') && !validator.equals(orderStatus, 'Fulfilled') && !validator.equals(orderStatus, 'In Transit') && !validator.equals(orderStatus, 'Delivered')) {
        
        return res.status(400).send({
            success: false,
            message: 'Status in incorrect format'
        });
    }
    else {
        res.orderId = orderId;
        res.orderStatus = orderStatus;
        next();
    }
};
module.exports = validate;