const mongoose = require('mongoose');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Warehouse = require('../models/Warehouse');

function createOrder(req, res, next) {
    const storeId = res.storeId;
    const orderId = res.orderId;
    const warehouseId = res.warehouseId;
    const frozenQuantity = res.frozenQuantity;
    const dairyQuantity = res.dairyQuantity;
    const meatQuantity = res.meatQuantity;
    const produceQuantity = res.produceQuantity;
    const ambientQuantity = res.ambientQuantity;
    const deliveryDateTime = res.deliveryDateTime;
    const orderDateTime = res.orderDateTime;

    Order.findOne({ orderId: orderId }, (err, order) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
            return;
        } if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order does not exist'
            });
            return;
        } if (order.storeId != storeId) {
            return res.status(406).send({
                success: false,
                message: 'Order does not belong to this store'
            });
            return;
        }
        if (order.orderStatus == "In Transit" || order.orderStatus == "Delivered") {
            return res.status(406).send({
                success: false,
                message: 'Order cannot be updated it has left the warehouse'
            });
            return;
        }

        //Old warehouse
         Warehouse.findOne({ id: order.warehouseId }, (err, warehouse) => {
             if (err) {
                 return res.status(400).send({
                     success: false,
                     message: err
                 });
                 return;
             } if (!warehouse) {
                 return res.status(404).send({
                     success: false,
                     message: 'Warehouse does not exist'
                 });
                 return;
             }

             const oldSOH = {
                 frozen: warehouse.SOH.frozen + frozenQuantity,
                 dairy: warehouse.SOH.dairy + dairyQuantity,
                 meat: warehouse.SOH.meat + meatQuantity,
                 produce: warehouse.SOH.produce + produceQuantity,
                 ambient: warehouse.SOH.ambient + ambientQuantity
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

                     return res.status(404).send({
                         success: false,
                         message: 'Warehouse does not exist'
                     });
                     return;
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
                     return;
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
                             return;
                         } else {
                             return;
                         }
                     });
                 Order.findOneAndUpdate(

                     { orderId: orderId },
                     {
                         $set: {
                             warehouseId: warehouseId,
                             frozenQuantity: frozenQuantity,
                             dairyQuantity: dairyQuantity,
                             meatQuantity: meatQuantity,
                             produceQuantity: produceQuantity,
                             ambientQuantity: ambientQuantity,
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
                             return;
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