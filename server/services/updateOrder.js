const mongoose = require('mongoose');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Warehouse = require('../models/Warehouse');



function createOrder(req, res, next) {
    const storeId = res.storeId;
    const orderId = res.orderId;
    const warehouseId = res.warehouseId;
    const productType = res.productType;
    const quantity = res.quantity;
    const deliveryDateTime = res.deliveryDateTime;
    const orderDateTime = res.orderDateTime;

    Order.findOne({ orderId: orderId }, (err, order) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order does not exist'
            });
        } if (order.storeId != storeId) {
            return res.status(406).send({
                success: false,
                message: 'Order does not belong to this store'
            });
        }
        if (order.orderStatus == "In Transit" || order.orderStatus == "Delivered") {
            return res.status(406).send({
                success: false,
                message: 'Order cannot be updated it has left the warehouse'
            });
        }
        //Old warehouse
        Warehouse.findOne({ id: order.warehouseId }, (err, warehouse) => {
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
            const oSOH = warehouse.SOH;

            const oldFrozenQuantity = oSOH.frozen;
            const oldDairyQuantity = oSOH.dairy;
            const oldMeatQuantity = oSOH.meat;
            const oldProduceQuantity = oSOH.produce;
            const oldAmbientQuantity = oSOH.ambient;

            let oldSOH = {
                frozen: 0,
                dairy: 0,
                meat: 0,
                produce: 0,
                ambient: 0
            }
            if (order.productType == "frozen") {
                oldSOH = {
                    frozen: oldFrozenQuantity + order.quantity,
                    dairy: oldDairyQuantity,
                    meat: oldMeatQuantity,
                    produce: oldProduceQuantity,
                    ambient: oldAmbientQuantity
                }
            } if (order.productType == "dairy") {
                oldSOH = {
                    frozen: oldFrozenQuantity,
                    dairy: oldDairyQuantity + order.quantity,
                    meat: oldMeatQuantity,
                    produce: oldProduceQuantity,
                    ambient: oldAmbientQuantity
                }
            } if (order.productType == "meat") {
                oldSOH = {
                    frozen: oldFrozenQuantity,
                    dairy: oldDairyQuantity,
                    meat: oldMeatQuantity + order.quantity,
                    produce: oldProduceQuantity,
                    ambient: oldAmbientQuantity
                }
            } if (order.productType == "produce") {
                oldSOH = {
                    frozen: oldFrozenQuantity,
                    dairy: oldDairyQuantity,
                    meat: oldMeatQuantity,
                    produce: oldProduceQuantity + order.quantity,
                    ambient: oldAmbientQuantity
                }
            } if (order.productType == "ambient") {
                oldSOH = {
                    frozen: oldFrozenQuantity,
                    dairy: oldDairyQuantity,
                    meat: oldMeatQuantity,
                    produce: oldProduceQuantity,
                    ambient: oldAmbientQuantity + order.quantity
                }
            }
            Warehouse.findOneAndUpdate(
                { id: order.warehouseId },
                { $set: { SOH: oldSOH } },
                {
                    returnOriginal: false,
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
            //New warehouse
            Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } if (!warehouse) {
                    console.log('here');

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
                Order.findOneAndUpdate(

                    { orderId: orderId },
                    {
                        $set: {
                            warehouseId: warehouseId,
                            productType: productType,
                            quantity: quantity,
                            deliveryDateTime: deliveryDateTime,
                            orderDateTime: orderDateTime
                        }
                    }, {
                        returnOriginal: false,
                    useFindAndModify: false
                },
                    (err, order) => {
                        if (err) {
                            return res.status(400).send({
                                success: false,
                                message: err
                            })
                        } else {
                            res.locals.order = order;
                            next();
                        }
                    });
            });

            
        })
    });
};


module.exports = createOrder;  