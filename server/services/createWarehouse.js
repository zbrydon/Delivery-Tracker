const mongoose = require('mongoose');
const Warehouse = require('../models/Warehouse');
const bcrypt = require('bcrypt');


function createWarehouse(req, res, next) {
    const { id, password } = req.body
    Warehouse.findOne({ id: id }, (err, warehouse) => {
        if (warehouse) {
            return res.status(406).send({
                success: false,
                message: 'ID already exists'
            });
        }
        bcrypt.hash(password, 10, function (err, password_hash) {
            if (err) {
                return res.status(400).send({ success: false, message: err });
            }
            const SOH = {
                frozen: 0,
                dairy: 0,
                meat: 0,
                produce: 0,
                ambient: 0
            };
            const newWarehouse = new Warehouse({
                id: id, password: password_hash, SOH: SOH,
                
                TEMP: {
                frozen: 0,
                dairy: 0,
                meat: 0,
                produce: 0,
                ambient: 0
            }
            });
            newWarehouse.save((err) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } else {
                    console.log('success');
                    next();
                }

            });
        })

    }

    )
};



module.exports = createWarehouse;  