const validator = require('validator');

function validate(req, res, next) {
    const { productType, quantity } = req.body
    const obj = res.obj;
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
    }else {
        res.obj = obj;
        res.productType = productType;
        res.quantity = quantity;
        next();
    }
};
module.exports = validate;