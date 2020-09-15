const express = require('express');
const validate = require('../middlewares/updateOrderStatusValidator');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const updateOrderStatus = require('../services/updateOrderStatus');
const transmit = require('../middlewares/transitMqttInit');
const fulfillOrder = express.Router();

/**
 * @api {post} /fulfillOrder Fulfill Order
 * @apiName Fulfill Order
 * @apiGroup Warehouse
 * 
 * @apiParam { Number}  orderId Order ID 
 * @apiParam {String} orderStatus Status of the order (Unfulfilled || Fulfilled || In Transit || Delivered)
 * 
 * @apiSuccess {Boolean} success Operation result
 * @apiSuccess {String} message Operation status
 * @apiSuccess {Object} order The updated order
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": true,
 *           "message": "Updated Order",
 *           "order": {
 *               "temperature": [],
 *               "_id": "5f3d199cb6189681741a8365",
 *               "orderId": 1000,
 *               "storeId": 1111,
 *               "warehouseId": 1111,
 *               "productType": "frozen",
 *               "quantity": 12,
 *               "deliveryDateTime": 1597909383000,
 *               "orderDateTime": 1597839772000,
 *               "orderStatus": "Fulfilled",
 *               "__v": 0
 *           }
 *      }
 * 
 * @apiError OrderNotFound The id of the order was not found.
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "success": false,
 *          "message": "Order not found"
 *      }
 **/ 

fulfillOrder.post('/fulfillOrder', authenticate, validate, updateOrderStatus, transmit , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Updated Order',
        order: res.locals.order
    })
});

module.exports = fulfillOrder;  