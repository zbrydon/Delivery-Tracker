const mongoose = require('mongoose');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Warehouse = require('../models/Warehouse');

function createOrder(req, res, next) {
    const storeId =res.obj.id;
    const orderId = req.body.orderId;
    // const warehouseId = req.body.warehouseId;
    const frozenQuantity = req.body.frozenQuantity;
    const dairyQuantity = req.body.dairyQuantity;
    const meatQuantity = req.body.meatQuantity;
    const produceQuantity = req.body.produceQuantity;
    const ambientQuantity = req.body.ambientQuantity;
    // const deliveryDateTime = req.body.deliveryDateTime;
    // const orderDateTime = req.body.orderDateTime;

    // console.log(res.obj);

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

        Order.findOneAndUpdate(

            { orderId: orderId },
            {
                $set: {
                    frozenQuantity: frozenQuantity,
                    dairyQuantity: dairyQuantity,
                    meatQuantity: meatQuantity,
                    produceQuantity: produceQuantity,
                    ambientQuantity: ambientQuantity
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
        //Old warehouse
        // Warehouse.findOne({ id: order.warehouseId }, (err, warehouse) => {
        //     if (err) {
        //         return res.status(400).send({
        //             success: false,
        //             message: err
        //         });
        //     } if (!warehouse) {
        //         return res.status(404).send({
        //             success: false,
        //             message: 'Warehouse does not exist'
        //         });
        //     }

        //     const oldSOH = {
        //         frozen: warehouse.SOH.frozen + frozenQuantity,
        //         dairy: warehouse.SOH.dairy + dairyQuantity,
        //         meat: warehouse.SOH.meat + meatQuantity,
        //         produce: warehouse.SOH.produce + produceQuantity,
        //         ambient: warehouse.SOH.ambient + ambientQuantity
        //     }
            
        //     Warehouse.findOneAndUpdate(
        //         { id: order.warehouseId },
        //         { $set: { SOH: oldSOH } },
        //         {
        //             returnOriginal: false,
        //             useFindAndModify: false
        //         },
        //         (err) => {
        //             if (err) {
        //                 return res.status(400).send({
        //                     success: false,
        //                     message: err
        //                 })
        //             } else {


        //                 return;
        //             }
        //         });
        //     //New warehouse
        //     Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
        //         if (err) {
        //             return res.status(400).send({
        //                 success: false,
        //                 message: err
        //             });
        //         } if (!warehouse) {
        //             console.log('here');

        //             return res.status(404).send({
        //                 success: false,
        //                 message: 'Warehouse does not exist'
        //             });
        //         }

        //         let newSOH = {
        //             frozen: 0,
        //             dairy: 0,
        //             meat: 0,
        //             produce: 0,
        //             ambient: 0
        //         }
        //         if (frozenQuantity > warehouse.SOH.frozen || dairyQuantity > warehouse.SOH.dairy || meatQuantity > warehouse.SOH.meat || produceQuantity > warehouse.SOH.produce || ambientQuantity > warehouse.SOH.ambient) {
        //             return res.status(406).send({
        //                 success: false,
        //                 message: 'Warehouse does not have enough stock to fulfill the order'
        //             });
        //         } else {
        //             newSOH = {
        //                 frozen: warehouse.SOH.frozen - frozenQuantity,
        //                 dairy: warehouse.SOH.dairy - dairyQuantity,
        //                 meat: warehouse.SOH.meat - meatQuantity,
        //                 produce: warehouse.SOH.produce - produceQuantity,
        //                 ambient: warehouse.SOH.ambient - ambientQuantity
        //             }
        //         }
        //         Warehouse.findOneAndUpdate(
        //             { id: warehouseId },
        //             { $set: { SOH: newSOH } },
        //             {
        //                 returnNewDocument: true,
        //                 useFindAndModify: false
        //             },
        //             (err) => {
        //                 if (err) {
        //                     return res.status(400).send({
        //                         success: false,
        //                         message: err
        //                     })
        //                 } else {
        //                     return;
        //                 }
        //             });
        //         Order.findOneAndUpdate(

        //             { orderId: orderId },
        //             {
        //                 $set: {
        //                     warehouseId: warehouseId,
        //                     frozenQuantity: frozenQuantity,
        //                     dairyQuantity: dairyQuantity,
        //                     meatQuantity: meatQuantity,
        //                     produceQuantity: produceQuantity,
        //                     ambientQuantity: ambientQuantity,
        //                     deliveryDateTime: deliveryDateTime,
        //                     orderDateTime: orderDateTime
        //                 }
        //             }, {
        //                 returnOriginal: false,
        //             useFindAndModify: false
        //         },
        //             (err, order) => {
        //                 if (err) {
        //                     return res.status(400).send({
        //                         success: false,
        //                         message: err
        //                     })
        //                 } else {
        //                     res.locals.order = order;
        //                     next();
        //                 }
        //             });
        //     });

            
        // })
    });
};


module.exports = createOrder;  