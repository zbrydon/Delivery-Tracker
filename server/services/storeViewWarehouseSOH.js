const Warehouse = require('../models/Warehouse');

function viewSOH(req, res, next) {
    const warehouseId = res.warehouseId;
    Warehouse.find({ id: warehouseId }, (err, warehouse) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!warehouse) {
            return res.status(400).send({
                success: false,
                message: 'This warehouse has no SOH'
            });
        } else {
            res.locals.SOH = warehouse[0].SOH;
            next();
        }
    });
};

module.exports = viewSOH;  