const Warehouse = require('../models/Warehouse');

function viewTEMP(req, res, next) {
    const warehouseId = res.obj.id;
    Warehouse.find({ id: warehouseId }, (err, warehouse) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!warehouse) {
            return res.status(400).send({
                success: false,
                message: 'This warehouse does not esist'
            });
        } else {
            res.locals.TEMP = warehouse[0].TEMP;
            next();
        }
    });
};

module.exports = viewTEMP;  