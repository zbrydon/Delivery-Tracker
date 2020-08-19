const validator = require('validator');

function validate(req, res, next) {
    const { deliveryId, deliveryStatus } = req.body
    if (!validator.isInt(deliveryId, { min: 4 }, { max: 5 })) {
        return res.status(400).send({
            success: false,
            message: 'Delivery ID in incorrect format'
        });
    }
    if (!validator.equals(deliveryStatus, 'Not Dispatched') && !validator.equals(deliveryStatus, 'In Transit') && !validator.equals(deliveryStatus, 'Delivered')) {
        return res.status(400).send({
            success: false,
            message: 'Status in incorrect format'
        });
    }
    else {
        res.deliveryId = deliveryId;
        res.deliveryStatus = deliveryStatus;
        next();
    }
};
module.exports = validate;