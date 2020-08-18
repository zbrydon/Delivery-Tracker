const mongoose = require('mongoose');
const Delivery = require('../models/Delivery');
const Order = require('../models/Order');
const deleteOrder = require('./deleteOrder')

function createDelivery(req, res, next) {
    const storeId = res.storeId;
    const warehouseId = res.warehouseId;
    const X = res.orderId;
    let productType = Order.findOne({ orderId: X }, function (err, docc) {
        if (!docc) {
            return res.status(400).send({
                success: false,
                message: 'Not Found'
            });
        } else {
            productType = docc.productType;
            return productType;
        }
    });
    const quantity = res.quantity;
    const deliveryDateTime = Date.parse(res.deliveryDateTime);
    const deliveryStatus = res.deliveryStatus;
    Delivery
        .find({})
        .select("deliveryId")
        .sort({ "deliveryId": -1 })
        .limit(1)
        .exec(function  (err, doc) {
            try {
                const max_orderId = doc[0].deliveryId;
                deliveryId = max_orderId + 1;
                const newDelivery = new Delivery({ deliveryId: deliveryId, storeId: storeId, warehouseId: warehouseId, productType: productType, quantity: quantity, deliveryDateTime: deliveryDateTime, deliveryStatus: deliveryStatus });
                
                newDelivery.save((err) => {
                    if (err) {
                        return res.status(406).send({
                            success: false,
                            message: err 
                        });
                    } else {
                        
                        res.orderId = X;
                        next();
                    }

                });
            }
            catch (err) {
                console.log(err);
                deliveryId = 1000;
                const newDelivery = new Delivery({ deliveryId: deliveryId, storeId: storeId, warehouseId: warehouseId, productType: productType, quantity: quantity, deliveryDateTime: deliveryDateTime, deliveryStatus: deliveryStatus});
                newDelivery.save((err) => {
                    if (err) {
                        return res.status(406).send({
                            success: false,
                            message: err
                        });
                    } else {
                        res.orderId = X;
                        next();
                    }

                });
            }

        });


};



module.exports = createDelivery;  