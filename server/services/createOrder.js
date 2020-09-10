const mongoose = require('mongoose');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Warehouse = require('../models/Warehouse');



function createOrder(req, res, next) {
    const storeId = res.storeId;
    const warehouseId = res.warehouseId;
    const frozenQuantity = res.frozenQuantity;
    const dairyQuantity = res.dairyQuantity;
    const meatQuantity = res.meatQuantity;
    const produceQuantity = res.produceQuantity;
    const ambientQuantity = res.ambientQuantity;
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
        let newSOH = {
            frozen: 0,
            dairy: 0,
            meat: 0,
            produce: 0,
            ambient: 0
        }
        if (frozenQuantity > warehouse.SOH.frozen || dairyQuantity > warehouse.SOH.dairy || meatQuantity > warehouse.SOH.meat || produceQuantity > warehouse.SOH.produce || ambientQuantity > warehouse.SOH.ambient) {
            return res.status(406).send({
                success: false,
                message: 'Warehouse does not have enough stock to fulfill the order'
            });
        } else {
            newSOH = {
                frozen: warehouse.SOH.frozen - frozenQuantity,
                dairy: warehouse.SOH.dairy - dairyQuantity,
                meat: warehouse.SOH.meat - meatQuantity,
                produce: warehouse.SOH.produce - produceQuantity,
                ambient: warehouse.SOH.ambient - ambientQuantity
            }
        }
        Warehouse.findOneAndUpdate(
            { id: warehouseId },
            { $set: { SOH: newSOH } },
            {
                returnNewDocument: true,
                useFindAndModify: false
            },
            (err) => {
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
                                frozenQuantity: frozenQuantity,
                                dairyQuantity: dairyQuantity,
                                meatQuantity: meatQuantity,
                                produceQuantity: produceQuantity,
                                ambientQuantity: ambientQuantity,
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
                                frozenQuantity: frozenQuantity,
                                dairyQuantity: dairyQuantity,
                                meatQuantity: meatQuantity,
                                produceQuantity: produceQuantity,
                                ambientQuantity: ambientQuantity,
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