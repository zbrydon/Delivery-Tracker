const Order = require('../models/Order');
const Store = require('../models/Store');

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
            //Update the delivery time to current 
            Order.findOneAndUpdate(
                { orderId: updated },
                { $set: { deliveryDateTime: currentDate } },
                {
                    returnOriginal: false,
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
        }
        if (newOrderStatus == "Delivered") {

            //updates the Store's SOH
            Store.findOne({ id: order.storeId }, (err, store) => {
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
                    const newSOH = {
                        frozen: order.frozenQuantity + store.SOH.frozen,
                        dairy: order.dairyQuantity + store.SOH.dairy,
                        meat: order.meatQuantity + store.SOH.meat,
                        produce: order.produceQuantity + store.SOH.produce,
                        ambient: order.ambientQuantity + store.SOH.ambient
                    }
                    Store.findOneAndUpdate(
                        { id: storeId },
                        { $set: { SOH: newSOH } },
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
                }

            });
        }     
        Order.find(
            { storeId: order.storeId },
            (err, orders) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } if (!orders && newOrderStatus == "Delivered") {
                    Store.findOneAndUpdate(
                        { storeId: order.storeId },
                        { $set: { hasOrdered: false } },
                        {
                            returnOriginal: false,
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
            { $set: { orderStatus: newOrderStatus } },
            {
                returnOriginal: false
            , 
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
    });
            

        

       
};

module.exports = updateOrder;  