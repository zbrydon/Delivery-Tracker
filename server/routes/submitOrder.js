const express = require('express');
const validate = require('../middlewares/orderValidator');
const authenticate = require('../middlewares/authenticateTokenStore');
const createOrder = require('../services/createOrder');
const submitOrder = express.Router();

/**
 * @api {post} /submitOrder Order Creation
 * @apiName Order Creation
 * @apiGroup Store
 *
 * @apiParam { Number}  warehouseId  Warehouse ID
 * @apiParam { String } productType The type of product being ordered (frozen || dairy || meat || produce || ambient)
 * @apiParam { Number } quantity The quantity being ordered
 * @apiParam { String } deliveryDateTime The requested time of delivery arival | Format (2020-08-20 10:10:10)
 *
 * @apiSuccess {Boolean} success Login result
 * @apiSuccess {String} message Login status
 * @apiSuccess {Object} order The order that was created
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *           "success": true,
 *           "message": "Order Created",
 *           "order": {
 *               "temperature": [],
 *               "_id": "5f4e2f699542e13530ca1835",
 *               "orderId": 1006,
 *               "storeId": 11111,
 *               "warehouseId": 1111,
 *               "productType": "frozen",
 *               "quantity": 12,
 *               "deliveryDateTime": 1629418210000,
 *               "orderDateTime": 1598959464000,
 *               "orderStatus": "Unfulfilled",
 *               "__v": 0
 *           }
 *       }
 *
 * @apiError BadRequest The id of the warehouse is incorrect.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 406 BadRequest
 *      {
 *           "success": false,
 *           "message": "Warehouse ID in incorrect format"
 *      }
 **/

submitOrder.post('/submitOrder', authenticate, validate,  createOrder , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Order Created',
        order: res.locals.order
    })
});

module.exports = submitOrder; 