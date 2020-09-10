const validator = require('validator');

function validate(req, res, next) {
    const { frozenQuantity, dairyQuantity, meatQuantity, produceQuantity, ambientQuantity } = req.body
    const obj = res.obj;
    if (!validator.isInt(frozenQuantity.toString(), { min: 1 ,  max: 20 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(dairyQuantity.toString(), { min: 1, max: 20 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(meatQuantity.toString(), { min: 1, max: 20 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(produceQuantity.toString(), { min: 1, max: 20 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    } if (!validator.isInt(ambientQuantity.toString(), { min: 1, max: 20 })) {
        return res.status(400).send({
            success: false,
            message: 'Quantity inncorrect'
        });
    }else {
        res.obj = obj;
        res.frozenQuantity = parseInt(frozenQuantity);
        res.dairyQuantity = parseInt(dairyQuantity);
        res.meatQuantity = parseInt(meatQuantity);
        res.produceQuantity = parseInt(produceQuantity);
        res.ambientQuantity = parseInt(ambientQuantity);
        next();
    }
};
module.exports = validate;
