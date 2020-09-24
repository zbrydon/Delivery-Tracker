const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewOrder = require('../services/viewOrdersByOrderId');
const viewOrdersByOrderId = express.Router();

/**
 * @api {get} /viewOrdersByOrderId View Store Order by ID
 * @apiName View Store Orders
 * @apiGroup Store
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Array} orders The orders from that store
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "Order Displayed",
 *           "orders": 
 *               {
 *                   "temperature": [],
 *                   "_id": "5f48ba4ad4ce8c6ee4329928",
 *                   "orderId": 1004,
 *                   "storeId": 11111,
 *                   "warehouseId": 1111,
 *                   "forzenQuantity":2,
 *                   "dairyQuantity":3,
 *                   "meatQuantity":4,
 *                   "produceQuantity":1,
 *                   "ambientQuantity":3,
 *                   "deliveryDateTime": 1600560610000,
 *                   "orderDateTime": 1598601802000,
 *                   "orderStatus": "Unfulfilled",
 *                   "location": {
 *                      "lat":-37.84832,
 *                      "long":145.65423
 *                      },
 *                   "ETA": 11,
 *                   "EDA":26.2,
 *                   "__v": 0
 *               }
 *       }
 *
 * @apiError NotFound The store has no orders.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *           "success": false,
 *           "message": "This store has no orders"
 *      }
 **/

viewOrdersByOrderId.get('/viewOrdersByOrderId', authenticate, viewOrder , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Order Displayed',
        orders: res.locals.orders
    })
});

module.exports = viewOrdersByOrderId; 