const validator = require('validator');

function validate(req, res, next) {
    const { warehouseId , productType, quantity , deliveryDateTime } = req.body
    const storeId = res.obj.id;
    if (!validator.isInt(warehouseId, { min: 4 })) {
        return res.status(400).send({
            success: false,
            message: 'Warehouse ID in incorrect format'
        });
    }
    if (!validator.equals(productType , 'frozen' || !validator.equals(productType ,'refrigerated') || !validator.equals(productType , 'ambient'))) {
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
    if (!validator.isInt((Date.parse(deliveryDateTime)).toString()) || Date.parse(deliveryDateTime) - Date.parse(currentDate) < 0) {
        return res.status(400).send({
            success: false,
            message: 'Date in incorrect format'
        });
    }
    else {
        res.storeId = storeId;
        res.warehouseId = warehouseId;
        res.productType = productType;
        res.quantity = quantity;
        res.deliveryDateTime = deliveryDateTime;
        next();
    }
};
module.exports = validate;