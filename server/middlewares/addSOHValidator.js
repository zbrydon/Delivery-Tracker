const validator = require('validator');

function validate(req, res, next) {
    const { productType, quantity } = req.body
    const obj = res.obj;
    let isStore = false;
    let isWarehouse = false;
    if (!validator.equals(productType, 'frozen') && !validator.equals(productType, 'dairy') && !validator.equals(productType, 'meat') && !validator.equals(productType, 'produce') && !validator.equals(productType, 'ambient')) {
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
    if (validator.isInt(obj.id, { min: 4 }, { max: 4 })) {
        isWarehouse = true;
    } if (validator.isInt(obj.id, { min: 5 }, { max: 5 })) {
         isStore = true;
    }
    else {
        res.obj = obj;
        res.productType = productType;
        res.quantity = quantity;
        res.isStore = isStore;
        res.isWarehouse = isWarehouse;
        next();
    }
};
module.exports = validate;