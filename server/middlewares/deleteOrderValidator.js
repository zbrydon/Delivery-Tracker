const validator = require('validator');

function validate(req, res, next) {
    const { orderId } = req.body
    const storeId = res.obj.id;

    if (!validator.isInt(orderId.toString(), { min: 1000, max: 9999 })) {
        return res.status(406).send({
            success: false,
            message: 'Order ID in incorrect format'
        });
    }
    else {
        res.storeId = storeId;
        res.orderId = orderId;
        next();
    }
};
module.exports = validate;