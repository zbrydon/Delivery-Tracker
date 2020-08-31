const Warehouse = require('../models/Warehouse');

function addSOH(req, res, next) {
    const id = res.obj.id;
    const productType = res.productType;
    const quantity = res.quantity;
    if (productType == 'frozen') {
        const newSOH = {
            frozen: quantity,
            dairy: 0,
            meat: 0,
            produce: 0,
            ambient: 0
        }
        Warehouse.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.warehouse = warehouse;
                    next();
                }
            });
    } if (productType == 'dairy') {
        const newSOH = {
            frozen: 0,
            dairy: quantity,
            meat: 0,
            produce: 0,
            ambient: 0
        }
        Warehouse.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.warehouse = warehouse;
                    next();
                }
            });
    } if (productType == 'meat') {
        const newSOH = {
            frozen: 0,
            dairy: 0,
            meat: quantity,
            produce: 0,
            ambient: 0
        }
        Warehouse.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.warehouse = warehouse;
                    next();
                }
            });
    } if (productType == 'produce') {
        const newSOH = {
            frozen: 0,
            dairy: 0,
            meat: 0,
            produce: quantity,
            ambient: 0
        }
        Warehouse.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.warehouse = warehouse;
                    next();
                }
            });
    } if (productType == 'ambient') {
        const newSOH = {
            frozen: 0,
            dairy: 0,
            meat: 0,
            produce: 0,
            ambient: quantity
        }
        Warehouse.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.warehouse = warehouse;
                    next();
                }
            });
    }
}; 


module.exports = addSOH;
