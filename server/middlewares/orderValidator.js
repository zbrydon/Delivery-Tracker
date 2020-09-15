const validator = require('validator');

function validate(req, res, next) {
    const { warehouseId, frozenQuantity, dairyQuantity, meatQuantity, produceQuantity, ambientQuantity} = req.body
    let deliveryDateTime = req.body.deliveryDateTime;
    const storeId = res.obj.id;

    if (!validator.isInt(warehouseId.toString(), { min: 1000, max: 9999 })) {
        return res.status(406).send({
            success: false,
            message: 'Warehouse ID in incorrect format'
        });
    }
    if (!validator.isInt(frozenQuantity.toString(), { min: 0, max: 5 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(dairyQuantity.toString(), { min: 0, max: 5 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(meatQuantity.toString(), { min: 0, max: 5 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(produceQuantity.toString(), { min: 0, max: 5 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(ambientQuantity.toString(), { min: 0, max: 5 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    }
    const currentDate = new Date();
    deliveryDateTime = Date.parse(deliveryDateTime);
    if (!validator.isInt(deliveryDateTime.toString()) || deliveryDateTime - Date.parse(currentDate) < 0) {
        return res.status(406).send({
            success: false,
            message: 'Date in incorrect format (2020-08-20 10:10:10) or has already passed'
        });
    }
    else {
        res.storeId = storeId;
        res.warehouseId = warehouseId;
        res.frozenQuantity = parseInt(frozenQuantity);
        res.dairyQuantity = parseInt(dairyQuantity);
        res.meatQuantity = parseInt(meatQuantity);
        res.produceQuantity = parseInt(produceQuantity);
        res.ambientQuantity = parseInt(ambientQuantity);
        res.deliveryDateTime = Number(deliveryDateTime);
        res.orderDateTime = Date.parse(currentDate);
        next();
    }
};
module.exports = validate;