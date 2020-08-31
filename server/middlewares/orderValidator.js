const validator = require('validator');

function validate(req, res, next) {
    const { warehouseId, productType, quantity } = req.body
    const obj = res.obj;
    let deliveryDateTime = req.body.deliveryDateTime;
    if (!validator.isInt(warehouseId, { min: 4 })) {
        return res.status(400).send({
            success: false,
            message: 'Warehouse ID in incorrect format'
        });
    }
    if (!validator.equals(productType, 'frozen') && !validator.equals(productType, 'dairy') && !validator.equals(productType, 'meat') && !validator.equals(productType, 'produce') && !validator.equals(productType , 'ambient')) {
        return res.status(400).send({
            success: false,
            message: 'Product Type in incorrect format'
        });
    }
    if (!validator.isInt(quantity, { min: 1 }, { max: 20 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    }
    const currentDate = new Date();
    deliveryDateTime = Date.parse(deliveryDateTime);
    if (!validator.isInt(deliveryDateTime.toString()) || deliveryDateTime - Date.parse(currentDate) < 0) {
        return res.status(400).send({
            success: false,
            message: 'Date in incorrect format (2020-08-20 10:10:10)'
        });
    }
    else {
        res.obj = obj;
        res.warehouseId = warehouseId;
        res.productType = productType;
        res.quantity = quantity;
        res.deliveryDateTime = Number(deliveryDateTime);
        res.orderDateTime = Date.parse(currentDate);
        next();
    }
};
module.exports = validate;