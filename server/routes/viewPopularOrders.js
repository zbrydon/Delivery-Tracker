
const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewOrder = require('../services/viewPopularOrders');

const viewPopularOrders = express.Router();

/**
 * @api {get} /viewPopularOrders View Popular Orders
 * @apiName View Popular Orders
 * @apiGroup Popular
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
 *           "message": "Orders Displayed",
 *           "orders": [
 *               {
 *                   "temperature": [],
 *                   "_id": "5f48ba4ad4ce8c6ee4329928",
 *                   "orderId": 1004,
 *                   "storeId": 11111,
 *                   "warehouseId": 1111,
 *                   "productType": "frozen",
 *                   "quantity": 12,
 *                   "deliveryDateTime": 1600560610000,
 *                   "orderDateTime": 1598601802000,
 *                   "orderStatus": "Unfulfilled",
 *                   "__v": 0
 *               },
 *               {
 *                   "temperature": [],
 *                   "_id": "5f48ba8e3059bc1fd4579124",
 *                   "orderId": 1005,
 *                   "storeId": 11111,
 *                   "warehouseId": 1111,
 *                   "productType": "frozen",
 *                   "quantity": 12,
 *                   "deliveryDateTime": 1600560610000,
 *                   "orderDateTime": 1598601870000,
 *                   "orderStatus": "Unfulfilled",
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

viewPopularOrders.get(
  "/viewPopularOrders",
  authenticate,
  viewOrder,
  (req, res) => {
    return res.status(200).send({
      success: true,
      message: "Orders Displayed",
      totals: res.locals.totals,
    });
  }
);

module.exports = viewPopularOrders;
