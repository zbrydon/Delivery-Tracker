const express = require('express');
const validate = require('../middlewares/updateOrderValidator');
const authenticateStore = require('../middlewares/authenticateTokenStore');
const updateOrderr = require('../services/updateOrder');
const updateOrder = express.Router();

/**
 * @api {post} /updateStoreSOH Update Order
 * @apiName Update Order
 * @apiGroup Store
 *
 * @apiParam { Number } orderId The ID of the order being updated
 * @apiParam { Number } warehouseId The new ID of the orders warehouse
 * @apiParam { String } productType The type of SOH being updated (frozen || dairy || meat || produce || ambient)
 * @apiParam { Number } quantity The new quantity
 * @apiParam { String } deliveryDateTime The requested time of delivery arrival ("2021-08-20 10:10:10")
 *
 * @apiSuccess {Boolean} success Update result
 * @apiSuccess {String} message Update status
 * @apiSuccess {Object} store The store that was updated
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": true,
 *          "message": "Order Updated",
 *          "order": {
 *              "temperature": [],
 *              "_id": "5f48ba4ad4ce8c6ee4329928",
 *              "orderId": 1001,
 *              "storeId": 11111,
 *              "warehouseId": 1111,
 *              "forzenQuantity":2,
 *               "dairyQuantity":3,
 *               "meatQuantity":4,
 *               "produceQuantity":1,
 *               "ambientQuantity":3,
 *              "deliveryDateTime": 1629418210000,
 *              "orderDateTime": 1599540600000,
 *              "orderStatus": "In Transit",
 *              "location": {
 *                  "lat":-37.84832,
 *                  "long":145.65423
 *              },
 *              "ETA": 11,
 *              "EDA":26.2,
 *              
 *              "__v": 0
 *          }
 *      }
 *
 * @apiError BadRequest The order does not belong to that store.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 406 BadRequest
 *      {
 *          "success": false,
 *          "message": "Order does not belong to this store"
 *      }
 **/

updateOrder.post('/updateOrder', authenticateStore, validate, updateOrderr,  (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Order Updated',
        order: res.locals.order
    })

});


module.exports = updateOrder; 