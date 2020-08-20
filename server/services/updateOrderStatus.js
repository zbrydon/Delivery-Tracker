const Order = require('../models/Order');

function updateOrder(req, res, next) {
    const updated = res.orderId;
    const newOrderStatus = res.orderStatus;
    Order.findOne({ orderId: updated }, (err, order) => {
        if (err) {
            return res.json({
                success: false,
                message: err
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
                        res.Order = Order;
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
            (err, Order) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } else {
                    res.Order = Order;
                    next();
                }
            });
    });


    

};

module.exports = updateOrder;  