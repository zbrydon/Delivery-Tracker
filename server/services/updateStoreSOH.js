const Store = require('../models/Store');

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
        Store.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.store = store;
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
        Store.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.store = store;
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
        Store.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.store = store;
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
        Store.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.store = store;
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
        Store.findOneAndUpdate(
            { id: id },
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
                    })
                } else {

                    
                    res.locals.store = store;
                    next();
                }
            });
    }
 
}; 


module.exports = addSOH;
