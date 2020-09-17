const Warehouse = require('../models/Warehouse');

function viewWarehouses(req, res, next) {
    Warehouse.countDocuments({ }, (err, count) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } else {
            res.locals.count = count;
        }
    });
    Warehouse.find({ }, { id: 1, location: 1, _id: 0 }, (err, warehouses) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        }
        const exists = warehouses[0]
        if (!exists) {
            return res.status(404).send({
                success: false,
                message: 'No Warehouses'
            });
        } else {

            res.locals.warehouses = warehouses;

            next();
        }
    });
};

module.exports = viewWarehouses;  