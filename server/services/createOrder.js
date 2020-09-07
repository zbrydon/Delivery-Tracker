const mongoose = require('mongoose');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Warehouse = require('../models/Warehouse');



function createOrder(req, res, next) {
    const storeId = res.storeId;
    const warehouseId = res.warehouseId;
    const productType = res.productType;
    const quantity = res.quantity;
    const deliveryDateTime = res.deliveryDateTime;
    const orderDateTime = res.orderDateTime;
    Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!warehouse) {
            return res.status(404).send({
                success: false,
                message: 'Warehouse does not exist'
            });
        }
        const SOH = warehouse.SOH;

        const frozenQuantity = SOH.frozen;
        const dairyQuantity = SOH.dairy;
        const meatQuantity = SOH.meat;
        const produceQuantity = SOH.produce;
        const ambientQuantity = SOH.ambient;

        let newSOH = {
            frozen: 0,
            dairy: 0,
            meat: 0,
            produce: 0,
            ambient: 0
        }

        if (productType == "frozen") {
            if (SOH.frozen < quantity) {
                return res.status(406).send({
                    success: false,
                    message: 'Warehouse does not have enough stock to fulfill the order'
                });
            } else {
                newSOH = {
                    frozen: frozenQuantity - quantity,
                    dairy: dairyQuantity,
                    meat: meatQuantity,
                    produce: produceQuantity,
                    ambient: ambientQuantity
                }
            }
        } if (productType == "dairy") {
            if (SOH.dairy < quantity) {
                return res.status(406).send({
                    success: false,
                    message: 'Warehouse does not have enough stock to fulfill the order'
                });
            } else {
                newSOH = {
                    frozen: frozenQuantity,
                    dairy: dairyQuantity - quantity,
                    meat: meatQuantity,
                    produce: produceQuantity,
                    ambient: ambientQuantity
                }
            }
        } if (productType == "meat") {
            if (SOH.meat < quantity) {
                return res.status(406).send({
                    success: false,
                    message: 'Warehouse does not have enough stock to fulfill the order'
                });
            } else {
                newSOH = {
                    frozen: frozenQuantity,
                    dairy: dairyQuantity,
                    meat: meatQuantity - quantity,
                    produce: produceQuantity,
                    ambient: ambientQuantity
                }
            }
        } if (productType == "produce") {
            if (SOH.produce < quantity) {
                return res.status(406).send({
                    success: false,
                    message: 'Warehouse does not have enough stock to fulfill the order'
                });
            } else {
                newSOH = {
                    frozen: frozenQuantity,
                    dairy: dairyQuantity,
                    meat: meatQuantity,
                    produce: produceQuantity - quantity,
                    ambient: ambientQuantity
                }
            }
        } if (productType == "ambient") {
            if (SOH.ambient < quantity) {
                return res.status(406).send({
                    success: false,
                    message: 'Warehouse does not have enough stock to fulfill the order'
                });
            } else {
                newSOH = {
                    frozen: frozenQuantity,
                    dairy: dairyQuantity,
                    meat: meatQuantity,
                    produce: produceQuantity,
                    ambient: ambientQuantity - quantity
                }
            }
        }
        Warehouse.findOneAndUpdate(
            { id: warehouseId },
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


                    return;
                }
            });
     });

    Order
        .find({})
        .select( "orderId" )
        .sort({ "orderId": -1 })
        .limit(1)
        .exec(function (err, doc) {
            try {
                const max_orderId = doc[0].orderId;
                orderId = max_orderId + 1;
                Store.findOneAndUpdate(
                    { storeId: storeId },
                    { $set: { hasOrdered: true } },
                    {
                        returnNewDocument: true,
                        useFindAndModify: false
                    },
                    (err) => {
                        if (err) {
                            return res.status(400).send({
                                success: false,
                                message: err
                            });
                        } else {
                            const newOrder = new Order({
                                orderId: orderId,
                                storeId: storeId,
                                warehouseId: warehouseId,
                                productType: productType,
                                quantity: quantity,
                                deliveryDateTime: deliveryDateTime,
                                orderDateTime: orderDateTime,
                                temperature: [],
                                orderStatus: 'Unfulfilled'
                            });
                            newOrder.save((err) => {
                                if (err) {
                                    return res.status(406).send({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    res.locals.order = newOrder;
                                    next();
                                }

                            });
                        }
                    });
                
            }
            catch(err){
                orderId = 1000;
                Store.findOneAndUpdate(
                    { storeId: storeId },
                    { $set: { hasOrdered: true } },
                    {
                        returnNewDocument: true,
                        useFindAndModify: false
                    },
                    (err) => {
                        if (err) {
                            return res.status(400).send({
                                success: false,
                                message: err
                            });
                        } else {
                            const newOrder = new Order({
                                orderId: orderId,
                                storeId: storeId,
                                warehouseId: warehouseId,
                                productType: productType,
                                quantity: quantity,
                                deliveryDateTime: deliveryDateTime,
                                orderDateTime: orderDateTime,
                                temperature: [],
                                orderStatus: 'Unfulfilled'
                            });
                            newOrder.save((err) => {
                                if (err) {
                                    return res.status(406).send({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    res.locals.order = newOrder;
                                    next();
                                }

                            });
                        }
                    });
            }
            
        });
    

};



module.exports = createOrder;  