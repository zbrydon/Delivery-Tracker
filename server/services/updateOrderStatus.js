const Order = require('../models/Order');
const Store = require('../models/Store');
const Warehouse = require('../models/Warehouse');

async function updateOrder(req, res, next) {
    const updated = res.orderId;
    const newOrderStatus = res.orderStatus;
    Order.findOne({ orderId: updated }, (err, order) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order not found'
            });
        }
        if (newOrderStatus == "In Transit" && order.orderStatus != "Fulfilled") {
            return res.status(406).send({
                success: false,
                message: 'Order not ready to be dispacted'
            });
        }
        if (newOrderStatus == "Delivered" && order.orderStatus != "In Transit") {
            return res.status(406).send({
                success: false,
                message: 'Order not ready to be Delivered'
            });
        }
        if (newOrderStatus == "Fulfilled" && order.orderStatus != "Unfulfilled") {
            return res.status(406).send({
                success: false,
                message: 'Order cannot be fulfilled'
            });
        }
        if (newOrderStatus == "In Transit") {
            let currentDate = new Date();
            currentDate = Date.parse(currentDate);
            Order.findOneAndUpdate(
                { orderId: updated },
                { $set: { deliveryDateTime: currentDate } },
                {
                    returnNewDocument: true,
                    useFindAndModify: false
                },
                (err, Order) => {
                    if (err) {
                        return res.status(400).send({
                            success: false,
                            message: err
                        });
                    } else {
                        res.locals.order = order;
                        next();
                    }
                });
        }
        const storeId = order.storeId;
        let storeSOH = null;
        if (newOrderStatus == "Delivered") {

            //Store
            Store.find({ id: storeId }, (err, store) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } if (!store) {
                    return res.status(400).send({
                        success: false,
                        message: 'This store does not esist'
                    });
                } else {
                    storeSOH = store[0].SOH;
                    let frozenQuantity = storeSOH.frozen;
                    let dairyQuantity = storeSOH.dairy;
                    let meatQuantity = storeSOH.meat;
                    let produceQuantity = storeSOH.produce;
                    let ambientQuantity = storeSOH.ambient;
                    let newSOH = {
                        frozen: 0,
                        dairy: 0,
                        meat: 0,
                        produce: 0,
                        ambient: 0
                    }
                    if (order.productType == "frozen") {
                        newSOH = {
                            frozen: frozenQuantity + order.quantity,
                            dairy: dairyQuantity,
                            meat: meatQuantity,
                            produce: produceQuantity,
                            ambient: ambientQuantity
                        }
                    } if (order.productType == "dairy") {
                        newSOH = {
                            frozen: frozenQuantity,
                            dairy: dairyQuantity + order.quantity,
                            meat: meatQuantity,
                            produce: produceQuantity,
                            ambient: ambientQuantity
                        }
                    } if (order.productType == "meat") {
                        newSOH = {
                            frozen: frozenQuantity,
                            dairy: dairyQuantity,
                            meat: meatQuantity + order.quantity,
                            produce: produceQuantity,
                            ambient: ambientQuantity
                        }
                    } if (order.productType == "produce") {
                        newSOH = {
                            frozen: frozenQuantity,
                            dairy: dairyQuantity,
                            meat: meatQuantity,
                            produce: produceQuantity + order.quantity,
                            ambient: ambientQuantity
                        }
                    } if (order.productType == "ambient") {
                        newSOH = {
                            frozen: frozenQuantity,
                            dairy: dairyQuantity,
                            meat: meatQuantity,
                            produce: produceQuantity,
                            ambient: ambientQuantity + order.quantity
                        }
                    }
                    Store.findOneAndUpdate(
                        { id: storeId },
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
                }

            });
        }       
    });
            

        

        Order.find(
            { storeId: storeId },
            (err, orders) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } if (!orders && newOrderStatus == "Delivered") {
                    Store.findOneAndUpdate(
                        { storeId: storeId },
                        { $set: { hasOrdered: false } },
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
                                return;
                            }

                        });
                }
            });
        Order.findOneAndUpdate(
            { orderId: updated },
            { $set: { orderStatus: /*newOrderStatus*/"In Transit" } },
            {
                returnNewDocument: true,
                useFindAndModify: false
            },
            (err, order) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } else {
                    res.locals.order = order;
                    next();
                }
            });
};

module.exports = updateOrder;  