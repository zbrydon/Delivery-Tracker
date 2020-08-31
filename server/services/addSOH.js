const mongoose = require('mongoose');
const Warehouse = require('../models/Warehouse');
const Store = require('../models/Store');

function addSOH(req, res, next) {
    const id = res.obj.id;
    const productType = res.productType;
    const quantity = res.quantity;
    const isStore = res.isStore;
    const isWarehouse = isWarehouse;
    if (isStore) {
        if (productType == 'frozen') {
            const newSOH = {
                frozen: quantity,
                dairy: 0,
                meat: 0,
                produce: 0,
                ambient: 0
            }
            updateStore(newSOH);
        } if (productType == 'dairy') {
            const newSOH = {
                frozen: 0,
                dairy: quantity,
                meat: 0,
                produce: 0,
                ambient: 0
            }
            updateStore(newSOH);
        } if (productType == 'meat') {
            const newSOH = {
                frozen: 0,
                dairy: 0,
                meat: quantity,
                produce: 0,
                ambient: 0
            }
            updateStore(newSOH);
        } if (productType == 'produce') {
            const newSOH = {
                frozen: 0,
                dairy: 0,
                meat: 0,
                produce: quantity,
                ambient: 0
            }
            updateStore(newSOH);
        } if (productType == 'ambient') {
            const newSOH = {
                frozen: 0,
                dairy: 0,
                meat: 0,
                produce: 0,
                ambient: quantity
            }
            updateStore(newSOH);
        }

    } if (isWarehouse) {
        if (productType == 'frozen') {
            const newSOH = {
                frozen: quantity,
                dairy: 0,
                meat: 0,
                produce: 0,
                ambient: 0
            }
            updateWarehouse(newSOH);
        } if (productType == 'dairy') {
            const newSOH = {
                frozen: 0,
                dairy: quantity,
                meat: 0,
                produce: 0,
                ambient: 0
            }
            updateWarehouse(newSOH);
        } if (productType == 'meat') {
            const newSOH = {
                frozen: 0,
                dairy: 0,
                meat: quantity,
                produce: 0,
                ambient: 0
            }
            updateWarehouse(newSOH);
        } if (productType == 'produce') {
            const newSOH = {
                frozen: 0,
                dairy: 0,
                meat: 0,
                produce: quantity,
                ambient: 0
            }
            updateWarehouse(newSOH);
        } if (productType == 'ambient') {
            const newSOH = {
                frozen: 0,
                dairy: 0,
                meat: 0,
                produce: 0,
                ambient: quantity
            }
            updateWarehouse(newSOH);
        }
    }
}; 

function updateStore(newSOH) {
    Store.findOneAndUpdate(
        { storeId: id },
        { $set: { SOH: newSOH } },
        {
            returnNewDocument: true,
            useFindAndModify: false
        },
        (err, store) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                });
            } else {
                res.locals.store = store;
                next();

            }
        });
};

function updateWarehouse(newSOH) {
    Warehouse.findOneAndUpdate(
        { warehouseId: id },
        { $set: { SOH: newSOH } },
        {
            returnNewDocument: true,
            useFindAndModify: false
        },
        (err, warehouse) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                });
            } else {
                res.locals.warehouse = warehouse;
                next();

            }
        });
};

module.exports = addSOH;
