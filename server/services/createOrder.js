const mongoose = require('mongoose');
const Order = require('../models/Order');



function createOrder(req, res, next) {
    const storeId = res.storeId;
    const warehouseId = res.warehouseId;
    const productType = res.productType;
    const quantity = res.quantity;
    const deliveryDateTime = res.deliveryDateTime;
    Order
        .find({})
        .select( "orderId" )
        .sort({ "orderId": -1 })
        .limit(1)
        .exec(function (err, doc) {
            try {
                const max_orderId = doc[0].orderId;
                orderId = max_orderId + 1;
                const newOrder = new Order({ orderId: orderId, storeId: storeId, warehouseId: warehouseId, productType: productType, quantity: quantity , deliveryDateTime: deliveryDateTime });
                newOrder.save((err) => {
                    if (err) {
                        return res.status(406).send({
                            success: false,
                            message: err
                        });
                    } else {
                        return res.status(200).send({
                            success: true,
                            message: 'Order Created'
                        });
                        next();
                    }

                });
            }
            catch(err){
                orderId = 1000;
                const newOrder = new Order({ orderId: orderId, storeId: storeId, warehouseId: warehouseId, productType: productType, quantity: quantity,deliveryDateTime: deliveryDateTime });
                newOrder.save((err) => {
                    if (err) {
                        return res.status(406).send({
                            success: false,
                            message: err
                        });
                    } else {
                        return res.status(200).send({
                            success: true,
                            message: 'Order Created'
                        });
                        next();
                    }

                });
            }
            
        });
    

};



module.exports = createOrder;  