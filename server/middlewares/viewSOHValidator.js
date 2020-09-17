const validator = require('validator');

function validate(req, res, next) {
    const { warehouseId } = req.body;
    const storeId = res.obj.id;

    if (!validator.isInt(warehouseId.toString(), { min: 1000, max: 9999 })) {
        return res.status(406).send({
            success: false,
            message: 'Warehouse ID in incorrect format'
        });
    }
    
    else {
        res.storeId = storeId;
        res.warehouseId = warehouseId;
        next();
    }
};
module.exports = validate;