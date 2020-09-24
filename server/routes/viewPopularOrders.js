
const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewOrder = require('../services/viewPopularOrders');

const viewPopularOrders = express.Router();

/**
 * @api {get} /viewPopularOrders View Popular Orders
 * @apiName View Popular Orders
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
 *           "message": "Popular Orders Displayed",
 *           "totals": {
 *              "frozen": 32,
                "dairy": 15,
                "meat": 12,
                "produce": 23,
                "ambient": 27
 *           },
 *           "storeId":11111
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
      message: "Popular Orders Displayed",
        totals: res.locals.totals,
      storeId:res.locals.storeId
    });
  }
);

module.exports = viewPopularOrders;
