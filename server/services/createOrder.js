const mongoose = require('mongoose');
const Order = require('../models/Order');
const Store = require('../models/Store');



function createOrder(req, res, next) {
    const storeId = res.obj.id;
    const warehouseId = res.warehouseId;
    const productType = res.productType;
    const quantity = res.quantity;
    const deliveryDateTime = res.deliveryDateTime;
    const orderDateTime = res.orderDateTime;
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