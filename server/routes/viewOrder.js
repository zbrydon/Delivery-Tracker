const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewOrderr = require('../services/viewOrder');
const viewOrder = express.Router();

/**
 * @api {get} /viewOrder View order details 
 * @apiName View Order
 * @apiGroup Store
 *
 *
 * @apiSuccess {Boolean} success Request result
 * @apiSuccess {String} message Request status
 * @apiSuccess {Object} order The orders details
 * @apiSuccess {Object} location The destination of the order 
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "Order Details Displayed",
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

viewOrder.get('/viewOrder', authenticate, viewOrderr, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Order Details Displayed',
        order: res.locals.order,
        location: res.locals.location
    })
});

module.exports = viewOrder; 