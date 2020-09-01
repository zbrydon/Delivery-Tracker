const Order = require('../models/Order');

function updateOrder(req, res, next) {
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
        Order.findOneAndUpdate(
            { orderId: updated },
            { $set: { orderStatus: newOrderStatus } },
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
                    //console.log(order);
                    //res.send({ order: order });
                    res.locals.order = order;
                    next();
                }
            });
    });


    

};

module.exports = updateOrder;  