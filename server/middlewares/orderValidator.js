const validator = require('validator');

function validate(req, res, next) {
    const { warehouseId, productType, quantity } = req.body
    let deliveryDateTime = req.body.deliveryDateTime;
    const storeId = res.obj.id;

    if (!validator.isInt(warehouseId.toString(), { min: 1000, max: 9999 })) {
        return res.status(406).send({
            success: false,
            message: 'Warehouse ID in incorrect format'
        });
    }
    if (!validator.equals(productType, 'frozen') && !validator.equals(productType, 'dairy') && !validator.equals(productType, 'meat') && !validator.equals(productType, 'produce') && !validator.equals(productType, 'ambient')) {
        return res.status(406).send({
            success: false,
            message: 'Product Type in incorrect format'
        });
    }
    if (!validator.isInt(quantity.toString(), { min: 1 ,  max: 20 })) {
        return res.status(406).send({
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
        res.productType = productType;
        res.quantity = quantity;
        res.deliveryDateTime = Number(deliveryDateTime);
        res.orderDateTime = Date.parse(currentDate);
        next();
    }
};
module.exports = validate;