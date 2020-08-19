const validator = require('validator');

function validate(req, res, next) {
    const { storeId ,  quantity , orderId , deliveryDateTime , deliveryStatus } = req.body
    const warehouseId = res.obj.id;
    if (!validator.isInt(storeId, { min: 4 })) {
        return res.status(400).send({
            success: false,
            message: 'Warehouse ID in incorrect format'
        });
    }
    if (!validator.isInt(orderId, { min: 4 })) {
        return res.status(400).send({
            success: false,
            message: 'Order ID in incorrect format'
        });
    }
    if (!validator.isInt(quantity, { min: 1 }, { max: 20 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    }
    const currentDate = new Date();
    if (!validator.isInt((Date.parse(deliveryDateTime)).toString()) || Date.parse(deliveryDateTime) - Date.parse(currentDate) < 0) {
        return res.status(400).send({
            success: false,
            message: 'Date in incorrect format'
        });
    }
    if (!validator.equals(deliveryStatus, 'Not Dispatched') && !validator.equals(deliveryStatus, 'In Transit') && !validator.equals(deliveryStatus, 'Delivered')) {
        return res.status(400).send({
            success: false,
            message: 'Status in incorrect format'
        });
    }
    else {
        res.storeId = storeId;
        res.warehouseId = warehouseId;
        res.orderId = orderId;
        res.quantity = quantity;
        res.deliveryDateTime = deliveryDateTime;
        res.deliveryStatus = deliveryStatus;
        next();
    }
};
module.exports = validate;